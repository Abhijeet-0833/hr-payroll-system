import React, { useState } from 'react';
import { 
  Play, 
  Calculator, 
  Zap, 
  CheckCircle2, 
  Server, 
  Database 
} from 'lucide-react';

export default function PayrollEngine({ employees, payrollHistory, onRunPayroll, openTechModal }) {
  const [selectedMonth, setSelectedMonth] = useState('September 2026');
  const [isProcessing, setIsProcessing] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [lastRunSuccess, setLastRunSuccess] = useState(null);

  // Tax Calculator Slider State
  const [calcSalary, setCalcSalary] = useState(85000);

  const steps = [
    "Connecting to Spring Boot REST Endpoint (/api/v1/payroll/process)...",
    "Fetching active employees via JPA Entity Graph (N+1 Query Avoided)...",
    "Applying Tax TDS Slabs & Statutory Provident Fund Deductions...",
    "Executing MySQL Composite Batch Insert (idx_payroll_batch)...",
    "Generating Digital Payslips & Returning HTTP 200 Response!"
  ];

  const handleExecuteBatchPayroll = () => {
    setIsProcessing(true);
    setStepIndex(0);
    setLastRunSuccess(null);

    // Step sequence simulation
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setStepIndex(currentStep);
      } else {
        clearInterval(interval);
        setIsProcessing(false);
        const totalNet = employees.reduce((sum, e) => sum + e.netSalary, 0);
        
        const newRun = {
          month: selectedMonth,
          processedCount: employees.length,
          totalDisbursed: totalNet,
          status: 'Completed',
          throughputMs: 840
        };

        onRunPayroll(newRun);
        setLastRunSuccess(newRun);
      }
    }, 600);
  };

  // Compute live tax breakdown for slider
  const calcBasic = calcSalary * 0.5;
  const calcHra = calcBasic * 0.4;
  const calcPf = calcBasic * 0.12;
  const calcTax = calcSalary > 100000 ? calcSalary * 0.15 : calcSalary * 0.08;
  const calcNet = calcSalary - calcPf - calcTax;

  return (
    <div className="payroll-engine">
      {/* Title Banner */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold text-white m-0">Automated Payroll & Tax Calculation Engine</h4>
          <small className="text-muted">Perform high-throughput monthly batch payroll execution and tax deductions</small>
        </div>
        <button
          className="btn btn-outline-info rounded-pill px-3 d-flex align-items-center gap-2"
          onClick={openTechModal}
        >
          <Server size={16} />
          <span>Spring Boot Service Code</span>
        </button>
      </div>

      {/* Main Execution Card */}
      <div className="row g-4 mb-4">
        <div className="col-lg-7">
          <div className="glass-card p-4 h-100 position-relative">
            <div className="d-flex align-items-center justify-content-between mb-3 border-bottom border-dark pb-3">
              <div>
                <h6 className="fw-bold text-white m-0 d-flex align-items-center gap-2">
                  <Play size={18} className="text-primary" />
                  <span>Execute Monthly Batch Payroll</span>
                </h6>
                <small className="text-muted">Disburse salaries for all active enterprise employees</small>
              </div>
              <span className="badge badge-tech">+35% MySQL Speed</span>
            </div>

            <div className="mb-4">
              <label className="form-label text-muted small fw-semibold">Select Payroll Period</label>
              <select
                className="form-select bg-dark border-secondary text-light w-50"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                disabled={isProcessing}
              >
                <option value="September 2026">September 2026 (Current Cycle)</option>
                <option value="October 2026">October 2026</option>
                <option value="November 2026">November 2026</option>
              </select>
            </div>

            {/* Execution Stepper Animation */}
            {isProcessing ? (
              <div className="bg-dark p-3 rounded-3 border border-primary mb-4">
                <div className="d-flex align-items-center gap-3 mb-2">
                  <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
                  <span className="fw-bold text-light" style={{ fontSize: '0.88rem' }}>
                    {steps[stepIndex]}
                  </span>
                </div>
                <div className="progress bg-secondary" style={{ height: '6px' }}>
                  <div
                    className="progress-bar bg-primary progress-bar-striped progress-bar-animated"
                    style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            ) : lastRunSuccess ? (
              <div className="bg-dark p-3 rounded-3 border border-emerald mb-4">
                <div className="d-flex align-items-center gap-2 text-emerald fw-bold mb-1">
                  <CheckCircle2 size={18} />
                  <span>Payroll Executed Successfully!</span>
                </div>
                <small className="text-muted d-block">
                  Processed {lastRunSuccess.processedCount} employee records in <strong>{lastRunSuccess.throughputMs} ms</strong>. 
                  Total Net Disbursed: <strong className="text-light">₹{lastRunSuccess.totalDisbursed.toLocaleString('en-IN')}</strong>
                </small>
              </div>
            ) : null}

            <div className="d-flex align-items-center justify-content-between pt-2">
              <div className="d-flex align-items-center gap-2 text-muted" style={{ fontSize: '0.8rem' }}>
                <Database size={15} />
                <span>Spring Security Authorized Role: <strong className="text-light">HR_ADMIN</strong></span>
              </div>
              <button
                className="btn btn-primary px-4 rounded-pill d-flex align-items-center gap-2"
                onClick={handleExecuteBatchPayroll}
                disabled={isProcessing}
              >
                <Zap size={16} />
                <span>{isProcessing ? 'Processing Batch...' : 'Run Payroll Now'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Tax Calculator Tool */}
        <div className="col-lg-5">
          <div className="glass-card p-4 h-100">
            <div className="d-flex align-items-center justify-content-between mb-3 border-bottom border-dark pb-3">
              <h6 className="fw-bold text-white m-0 d-flex align-items-center gap-2">
                <Calculator size={18} className="text-warning" />
                <span>Real-Time Tax Simulator</span>
              </h6>
              <small className="text-muted">Indian Tax Slabs</small>
            </div>

            <div className="mb-3">
              <div className="d-flex align-items-center justify-content-between mb-1">
                <label className="text-muted small fw-semibold">Monthly Gross Salary</label>
                <span className="fw-bold text-warning">₹{calcSalary.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                className="form-range"
                min="30000"
                max="250000"
                step="5000"
                value={calcSalary}
                onChange={(e) => setCalcSalary(Number(e.target.value))}
              />
            </div>

            {/* Calculated Breakdown Box */}
            <div className="bg-dark p-3 rounded-3 border border-secondary">
              <div className="d-flex justify-content-between text-muted mb-1" style={{ fontSize: '0.82rem' }}>
                <span>Basic Pay (50%):</span>
                <span className="text-light">₹{calcBasic.toLocaleString('en-IN')}</span>
              </div>
              <div className="d-flex justify-content-between text-muted mb-1" style={{ fontSize: '0.82rem' }}>
                <span>HRA Exemption (40%):</span>
                <span className="text-light">₹{calcHra.toLocaleString('en-IN')}</span>
              </div>
              <div className="d-flex justify-content-between text-muted mb-1" style={{ fontSize: '0.82rem' }}>
                <span>Provident Fund (12%):</span>
                <span className="text-danger">- ₹{calcPf.toLocaleString('en-IN')}</span>
              </div>
              <div className="d-flex justify-content-between text-muted mb-2" style={{ fontSize: '0.82rem' }}>
                <span>Income Tax TDS:</span>
                <span className="text-danger">- ₹{calcTax.toLocaleString('en-IN')}</span>
              </div>
              <div className="border-top border-secondary pt-2 d-flex justify-content-between align-items-center">
                <span className="fw-bold text-light" style={{ fontSize: '0.9rem' }}>Estimated Net Pay:</span>
                <span className="fw-bold text-emerald" style={{ fontSize: '1.1rem' }}>₹{calcNet.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Payroll Runs Table */}
      <div className="glass-card p-3">
        <h6 className="fw-bold text-white mb-3 px-2">Historical Batch Payroll Execution Logs</h6>
        <div className="table-responsive">
          <table className="table table-custom mb-0">
            <thead>
              <tr>
                <th>Payroll Period</th>
                <th>Records Processed</th>
                <th>Total Disbursed Amount</th>
                <th>Batch Execution Speed</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payrollHistory.map((run, idx) => (
                <tr key={idx}>
                  <td className="fw-bold text-light">{run.month}</td>
                  <td className="text-muted">{run.processedCount} Staff Members</td>
                  <td className="fw-bold text-emerald">₹{run.totalDisbursed.toLocaleString('en-IN')}</td>
                  <td>
                    <span className="text-info fw-semibold">{run.throughputMs} ms</span>
                    <small className="text-muted ms-2">(+35% Benchmark)</small>
                  </td>
                  <td>
                    <span className="badge badge-status-active">{run.status}</span>
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
