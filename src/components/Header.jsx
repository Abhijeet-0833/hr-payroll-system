import React from 'react';
import { 
  Search, 
  Zap, 
  Code2, 
  UserCheck, 
  Sun, 
  Moon, 
  Download 
} from 'lucide-react';

export default function Header({ theme, toggleTheme, openTechModal, onQuickOnboard, onExportCSV }) {
  return (
    <header className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom border-secondary">
      {/* Search & Performance Badge */}
      <div className="d-flex align-items-center gap-3">
        <div className="input-group" style={{ width: '300px' }}>
          <span className="input-group-text bg-dark border-secondary text-muted">
            <Search size={16} />
          </span>
          <input
            type="text"
            className="form-control bg-dark border-secondary text-light"
            placeholder="Search employees, payroll, tax ID..."
            style={{ fontSize: '0.88rem' }}
          />
        </div>

        {/* Live Benchmark Badge */}
        <div className="d-none d-lg-flex align-items-center gap-2 px-3 py-1.5 rounded-pill border border-emerald pulse-badge bg-dark">
          <Zap size={15} className="text-emerald" />
          <span className="text-emerald fw-semibold" style={{ fontSize: '0.78rem' }}>
            +35% MySQL Payroll Speed Boost Active
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="d-flex align-items-center gap-3">
        {/* Dark/Light Theme Toggle */}
        <button
          className="btn btn-outline-secondary btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center text-warning"
          onClick={toggleTheme}
          title="Toggle Light/Dark Theme"
          style={{ width: '36px', height: '36px' }}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} className="text-dark" />}
        </button>

        {/* CSV Export Button */}
        <button
          className="btn btn-outline-emerald btn-sm d-flex align-items-center gap-2 px-3 rounded-pill text-emerald border-emerald"
          onClick={onExportCSV}
          title="Export Employee Roster to CSV"
        >
          <Download size={15} />
          <span>Export CSV</span>
        </button>

        {/* Architecture Inspector */}
        <button
          className="btn btn-outline-info btn-sm d-flex align-items-center gap-2 px-3 rounded-pill"
          onClick={openTechModal}
        >
          <Code2 size={16} />
          <span>Inspect Architecture</span>
        </button>

        {/* Onboard Employee */}
        <button
          className="btn btn-primary btn-sm d-flex align-items-center gap-2 px-3 rounded-pill"
          onClick={onQuickOnboard}
        >
          <UserCheck size={16} />
          <span>+ Onboard Staff</span>
        </button>
      </div>
    </header>
  );
}
