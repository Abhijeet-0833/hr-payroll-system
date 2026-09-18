import React from 'react';
import { Printer, Building2, CheckCircle2 } from 'lucide-react';

export default function PayslipModal({ employee, onClose }) {
  if (!employee) return null;

  const handlePrint = () => {
    window.print();
  };

  const grossEarnings = employee.basicSalary + employee.hra + employee.specialAllowance;
  const totalDeductions = employee.pfDeduction + employee.taxDeduction;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.82)' }} tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content glass-card border-secondary text-light overflow-hidden">
          {/* Top Bar Actions */}
          <div className="modal-header border-secondary bg-dark px-4">
            <div className="d-flex align-items-center gap-2">
              <Building2 size={20} className="text-primary" />
              <h6 className="modal-title fw-bold text-white m-0">Official Digital Payslip — September 2026</h6>
            </div>
            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-sm btn-primary rounded-pill px-3 d-flex align-items-center gap-2" onClick={handlePrint}>
                <Printer size={15} />
                <span>Print Payslip</span>
              </button>
              <button className="btn-close btn-close-white" onClick={onClose}></button>
            </div>
          </div>

          {/* Printable Payslip Body */}
          <div className="modal-body p-4 bg-white text-dark" id="printable-payslip">
            <div className="payslip-header d-flex justify-content-between align-items-start border-bottom pb-3 mb-4">
              <div>
                <h4 className="fw-bold text-navy m-0" style={{ color: '#0f2c59' }}>SMART SOFTWARE SERVICES PVT. LTD.</h4>
                <p className="text-muted small m-0">Software Tech Park, Baner High Street, Pune, Maharashtra 411045</p>
                <small className="text-secondary fw-semibold">CIN: U72200PN2021PTC198421 • HR Payroll Portal</small>
              </div>
              <div className="text-end">
                <span className="badge bg-success text-white px-3 py-2 rounded-pill fw-normal" style={{ fontSize: '0.8rem' }}>
                  CONFIDENTIAL PAYSLIP
                </span>
                <div className="fw-bold text-dark mt-2" style={{ fontSize: '0.9rem' }}>PAY PERIOD: SEP 2026</div>
              </div>
            </div>

            {/* Employee Information Grid */}
            <div className="row bg-light p-3 rounded mb-4 border g-3">
              <div className="col-md-6">
                <div className="small text-muted">Employee Name: <strong className="text-dark">{employee.name}</strong></div>
                <div className="small text-muted">Employee ID: <strong className="text-dark">{employee.id}</strong></div>
                <div className="small text-muted">Designation: <strong className="text-dark">{employee.designation}</strong></div>
              </div>
              <div className="col-md-6">
                <div className="small text-muted">Department: <strong className="text-dark">{employee.department}</strong></div>
                <div className="small text-muted">Bank Account: <strong className="text-dark">{employee.bankAccount}</strong></div>
                <div className="small text-muted">PAN Card: <strong className="text-dark">{employee.pan}</strong></div>
              </div>
            </div>

            {/* Salary Breakdown Table */}
            <div className="row g-4 mb-4">
              {/* Earnings Column */}
              <div className="col-md-6">
                <h6 className="fw-bold text-primary border-bottom pb-2">EARNINGS (ALLOWANCES)</h6>
                <div className="d-flex justify-content-between py-1 border-bottom small">
                  <span>Basic Salary</span>
                  <span className="fw-semibold">₹{employee.basicSalary.toLocaleString('en-IN')}</span>
                </div>
                <div className="d-flex justify-content-between py-1 border-bottom small">
                  <span>House Rent Allowance (HRA)</span>
                  <span className="fw-semibold">₹{employee.hra.toLocaleString('en-IN')}</span>
                </div>
                <div className="d-flex justify-content-between py-1 border-bottom small">
                  <span>Special Allowance</span>
                  <span className="fw-semibold">₹{employee.specialAllowance.toLocaleString('en-IN')}</span>
                </div>
                <div className="d-flex justify-content-between py-2 border-top fw-bold text-dark mt-2">
                  <span>GROSS EARNINGS</span>
                  <span>₹{grossEarnings.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Deductions Column */}
              <div className="col-md-6">
                <h6 className="fw-bold text-danger border-bottom pb-2">STATUTORY DEDUCTIONS</h6>
                <div className="d-flex justify-content-between py-1 border-bottom small">
                  <span>Provident Fund (PF - 12%)</span>
                  <span className="fw-semibold text-danger">₹{employee.pfDeduction.toLocaleString('en-IN')}</span>
                </div>
                <div className="d-flex justify-content-between py-1 border-bottom small">
                  <span>Income Tax (TDS)</span>
                  <span className="fw-semibold text-danger">₹{employee.taxDeduction.toLocaleString('en-IN')}</span>
                </div>
                <div className="d-flex justify-content-between py-2 border-top fw-bold text-dark mt-2">
                  <span>TOTAL DEDUCTIONS</span>
                  <span className="text-danger">₹{totalDeductions.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Net Pay Highlight Banner */}
            <div className="bg-success-subtle border border-success p-3 rounded d-flex justify-content-between align-items-center mb-4">
              <div>
                <span className="text-success fw-bold text-uppercase small">Net Payable Amount:</span>
                <h3 className="fw-bold text-success m-0">₹{employee.netSalary.toLocaleString('en-IN')}</h3>
              </div>
              <div className="text-end text-muted small">
                <CheckCircle2 size={24} className="text-success mb-1" />
                <div>Direct Bank Transfer Executed</div>
              </div>
            </div>

            <div className="text-center text-muted small border-top pt-3">
              This is a system-generated electronic payslip generated via Spring Boot Payroll Engine. No signature required.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
