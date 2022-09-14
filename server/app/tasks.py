from datetime import datetime

import requests
from flask import current_app

from . import db, scheduler
from .utils import check_scan_report_status, check_scan_report, scan_report_expires


def scan_hash(job_id, hash):
    with scheduler.app.app_context():
        scan_report = check_scan_report(hash)

        if scan_report.status_code == 2 or scan_report_expires(scan_report):
            vt_report_url = 'https://www.virustotal.com/vtapi/v2/file/report'
            params = {
                'apikey': current_app.config['VT_API_KEY'],
                'resource': hash
            }

            response = requests.get(vt_report_url, params=params)
            scan_report_status_code = check_scan_report_status(response)

            if scan_report_status_code == 1:
                data = response.json()

                scan_report.status_code = 1
                scan_report.positives = data['positives']
                scan_report.total = data['total']
                scan_report.scan_date = datetime.utcnow()

                db.session.commit()

                scheduler.remove_job(job_id)
            elif scan_report_status_code == 3:
                scan_report.status_code = 3
                scan_report.scan_date = datetime.utcnow()

                db.session.commit()

                scheduler.remove_job(job_id)
