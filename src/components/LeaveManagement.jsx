import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

export default function LeaveManagement({ leaves, onUpdateLeaveStatus }) {
  return (
    <div className="leave-management">
      {/* Title */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold text-white m-0">Attendance & Leave Management Workflow</h4>
          <small className="text-muted">Review leave requests, approval status & employee attendance logs</small>
        </div>
      </div>

      {/* Leave Requests Table Card */}
      <div className="glass-card p-3 mb-4">
        <h6 className="fw-bold text-white mb-3 px-2">Leave Applications</h6>
        <div className="table-responsive">
          <table className="table table-custom mb-0">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Leave Details</th>
                <th>Duration</th>
                <th>Reason</th>
                <th>Applied On</th>
                <th>Status</th>
                <th>Approval Action</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.id}>
                  <td>
                    <div className="fw-bold text-light">{leave.employeeName}</div>
                    <small className="text-muted">{leave.empId}</small>
                  </td>
                  <td>
                    <span className="badge badge-tech">{leave.leaveType}</span>
                    <br />
                    <small className="text-muted">{leave.startDate} to {leave.endDate}</small>
                  </td>
                  <td className="fw-bold text-light">{leave.days} Day(s)</td>
                  <td className="text-muted" style={{ maxWidth: '220px' }}>{leave.reason}</td>
                  <td className="text-muted">{leave.appliedOn}</td>
                  <td>
                    <span className={
                      leave.status === 'Approved' ? 'badge badge-status-active' :
                      leave.status === 'Rejected' ? 'badge bg-danger text-light' :
                      'badge badge-status-pending'
                    }>
                      {leave.status}
                    </span>
                  </td>
                  <td>
                    {leave.status === 'Pending' ? (
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-sm btn-success d-flex align-items-center gap-1 rounded-pill px-3"
                          onClick={() => onUpdateLeaveStatus(leave.id, 'Approved')}
                        >
                          <CheckCircle size={14} />
                          <span>Approve</span>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1 rounded-pill px-2"
                          onClick={() => onUpdateLeaveStatus(leave.id, 'Rejected')}
                        >
                          <XCircle size={14} />
                        </button>
                      </div>
                    ) : (
                      <small className="text-muted italic">No action required</small>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
