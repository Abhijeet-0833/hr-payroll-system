import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calculator, 
  CalendarCheck, 
  Building2
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'employees', label: 'Employee Directory', icon: Users },
    { id: 'payroll', label: 'Payroll & Tax Engine', icon: Calculator },
    { id: 'leaves', label: 'Attendance & Leaves', icon: CalendarCheck },
  ];

  return (
    <aside className="app-sidebar d-flex flex-column justify-content-between">
      <div>
        {/* Brand Header */}
        <div className="p-4 border-bottom border-dark d-flex align-items-center gap-3">
          <div className="bg-primary text-white p-2 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px' }}>
            <Building2 size={24} />
          </div>
          <div>
            <h6 className="m-0 fw-bold text-white tracking-wide">Enterprise HR Portal</h6>
            <small className="text-muted" style={{ fontSize: '0.75rem' }}>Management Suite</small>
          </div>
        </div>

        {/* Main Nav Items */}
        <div className="p-3">
          <div className="text-uppercase text-muted fw-semibold mb-2 px-3" style={{ fontSize: '0.7rem', letterSpacing: '0.08em' }}>
            Main Modules
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link-custom ${isActive ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(item.id);
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-3 border-top border-dark text-center text-muted small">
        <small style={{ fontSize: '0.75rem' }}>© 2026 HR & Payroll System</small>
      </div>
    </aside>
  );
}
