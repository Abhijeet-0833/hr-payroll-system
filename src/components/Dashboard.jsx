import React, { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  CalendarCheck, 
  Zap, 
  CheckCircle 
} from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Dashboard({ employees, leaves, setActiveTab }) {
  const [chartView, setChartView] = useState('net'); // 'net' or 'tax'

  const totalEmployees = employees.length;
  const totalGrossPayroll = employees.reduce((acc, emp) => acc + emp.basicSalary + emp.hra + emp.specialAllowance, 0);
  const totalTaxDeducted = employees.reduce((acc, emp) => acc + emp.taxDeduction, 0);
  const pendingLeaves = leaves.filter(l => l.status === 'Pending').length;

  // Department payroll data
  const deptData = employees.reduce((acc, emp) => {
    const val = chartView === 'net' ? emp.netSalary : emp.taxDeduction;
    acc[emp.department] = (acc[emp.department] || 0) + val;
    return acc;
  }, {});

  const barChartData = {
    labels: Object.keys(deptData),
    datasets: [
      {
        label: chartView === 'net' ? 'Net Salary (₹)' : 'TDS Tax Deducted (₹)',
        data: Object.values(deptData),
        backgroundColor: chartView === 'net' 
          ? ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899']
          : ['#ef4444', '#f97316', '#eab308', '#84cc16', '#06b6d4'],
        borderRadius: 8,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => ` Amount: ₹${context.raw.toLocaleString('en-IN')}`
        }
      }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#9ca3af' } },
      y: { grid: { color: '#26334d' }, ticks: { color: '#9ca3af' } }
    }
  };

  return (
    <div className="dashboard-view">
      {/* Top Banner */}
      <div className="glass-card p-4 mb-4 position-relative overflow-hidden border-start border-4 border-primary">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <span className="badge badge-tech mb-2">Enterprise HR & Payroll Portal</span>
            <h4 className="fw-bold text-white mb-2">Comprehensive Staff & Payroll Management</h4>
            <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
              Manage employee directories, run automated monthly salary batch calculations, generate itemized payslips, and process leave requests.
            </p>
          </div>
          <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
            <button
              className="btn btn-primary btn-sm rounded-pill px-4 py-2"
              onClick={() => setActiveTab('payroll')}
            >
              Run Batch Payroll →
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="stat-card">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted fw-semibold" style={{ fontSize: '0.82rem' }}>Total Active Staff</span>
              <Users size={20} className="text-primary" />
            </div>
            <h3 className="fw-bold text-white mb-1">{totalEmployees}</h3>
            <small className="text-emerald d-flex align-items-center gap-1" style={{ fontSize: '0.75rem' }}>
              <TrendingUp size={12} /> Active Personnel
            </small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="stat-card emerald">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted fw-semibold" style={{ fontSize: '0.82rem' }}>Monthly Gross Payroll</span>
              <DollarSign size={20} className="text-emerald" />
            </div>
            <h3 className="fw-bold text-white mb-1">₹{(totalGrossPayroll / 100000).toFixed(2)} Lakhs</h3>
            <small className="text-emerald d-flex align-items-center gap-1" style={{ fontSize: '0.75rem' }}>
              <CheckCircle size={12} /> Total Calculated Disbursement
            </small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="stat-card purple">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted fw-semibold" style={{ fontSize: '0.82rem' }}>Tax Deducted (TDS)</span>
              <Zap size={20} className="text-purple" />
            </div>
            <h3 className="fw-bold text-white mb-1">₹{(totalTaxDeducted / 1000).toFixed(1)}k</h3>
            <small className="text-purple d-flex align-items-center gap-1" style={{ fontSize: '0.75rem' }}>
              Statutory Withholdings
            </small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="stat-card amber">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted fw-semibold" style={{ fontSize: '0.82rem' }}>Pending Leave Requests</span>
              <CalendarCheck size={20} className="text-warning" />
            </div>
            <h3 className="fw-bold text-white mb-1">{pendingLeaves}</h3>
            <small
              className="text-warning text-decoration-underline cursor-pointer"
              style={{ fontSize: '0.75rem', cursor: 'pointer' }}
              onClick={() => setActiveTab('leaves')}
            >
              Review approvals →
            </small>
          </div>
        </div>
      </div>

      {/* Analytics Chart */}
      <div className="row g-3 mb-4">
        <div className="col-12">
          <div className="glass-card p-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h6 className="fw-bold text-white m-0">Departmental Financial Metrics</h6>
                <small className="text-muted">Live distribution across organizational departments</small>
              </div>
              <div className="btn-group btn-group-sm">
                <button
                  className={`btn ${chartView === 'net' ? 'btn-primary' : 'btn-outline-secondary text-light'}`}
                  onClick={() => setChartView('net')}
                >
                  Net Payroll
                </button>
                <button
                  className={`btn ${chartView === 'tax' ? 'btn-danger' : 'btn-outline-secondary text-light'}`}
                  onClick={() => setChartView('tax')}
                >
                  Tax TDS
                </button>
              </div>
            </div>
            <Bar data={barChartData} options={barOptions} height={80} />
          </div>
        </div>
      </div>
    </div>
  );
}
