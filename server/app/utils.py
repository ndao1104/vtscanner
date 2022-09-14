from datetime import datetime

from .models import ScanReport


def get_hashes(file):
    hashes = []

    for line in file.read().splitlines():
        hashes.append(line.decode('utf-8'))

    return hashes


def check_scan_report(hash):
    return ScanReport.query.filter_by(hash=hash).first()


def check_scan_report_status(response):
    http_status_code = response.status_code

    if http_status_code == 200:
        vt_response_code = response.json()['response_code']

        if vt_response_code == 1:
            return 1
        elif vt_response_code == 0:
            return 3
        elif vt_response_code == -2:
            return 2
    elif http_status_code == 204:
        return 2


def scan_report_expires(scan_report):
    datetime_diff = datetime.utcnow() - scan_report.scan_date

    return datetime_diff.days > 0
