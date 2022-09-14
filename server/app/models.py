from . import db


class ScanReport(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    hash = db.Column(db.String(32), unique=True, nullable=False)
    status_code = db.Column(db.Integer, nullable=False)
    positives = db.Column(db.Integer)
    total = db.Column(db.Integer)
    scan_date = db.Column(db.DateTime)

    def to_dict(self):
        return {
            'hash': self.hash,
            'status_code': self.status_code,
            'positives': self.positives,
            'total': self.total,
            'scan_date': self.scan_date.strftime('%Y-%m-%d %H:%M:%S') if self.scan_date is not None else None
        }

    def __repr__(self):
        return '<Report %r>' % self.hash


class ScanRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    reference_number = db.Column(db.String(36), nullable=False)
    hash = db.Column(db.String(32), nullable=False)

    def __repr__(self):
        return '<Request %r>' % self.reference_number
