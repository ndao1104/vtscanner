import uuid

from flask import request, jsonify, Blueprint, current_app

from . import db, scheduler
from .models import ScanRequest, ScanReport
from .utils import get_hashes, check_scan_report, scan_report_expires
from .tasks import scan_hash

analysis = Blueprint('analysis', __name__)


@analysis.post('/scan')
def scan_hashes():
    hashes = get_hashes(request.files['file'])
    reference_number = uuid.uuid4()

    for hash in hashes:
        scan_request = ScanRequest(
            reference_number=reference_number,
            hash=hash
        )

        db.session.add(scan_request)
        db.session.commit()

        if check_scan_report(hash) is None:
            scan_report = ScanReport(
                hash=hash,
                status_code=2
            )

            db.session.add(scan_report)
            db.session.commit()

        job_id = f'scan_hash_{hash}'

        scheduler.add_job(
            func=scan_hash,
            args=[job_id, hash],
            trigger='interval',
            seconds=15,
            id=job_id,
            replace_existing=True,
        )

    return jsonify(reference_number)


@analysis.get('/reports/<reference_number>')
def get_scan_reports(reference_number):
    scan_report_list = ScanReport.query \
        .join(ScanRequest, ScanReport.hash == ScanRequest.hash) \
        .filter_by(reference_number=reference_number).all()

    scan_reports = [scan_report.to_dict() for scan_report in scan_report_list]

    return jsonify(scan_reports)
