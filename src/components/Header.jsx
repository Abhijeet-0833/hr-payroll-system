import React from 'react';
import { 
  Search, 
  UserCheck, 
  Sun, 
  Moon, 
  Download 
} from 'lucide-react';

export default function Header({ theme, toggleTheme, onQuickOnboard, onExportCSV }) {
  return (
    <header className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom border-secondary">
      {/* Search Input */}
      <div className="d-flex align-items-center gap-3">
        <div className="input-group" style={{ width: '320px' }}>
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
