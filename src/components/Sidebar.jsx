import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calculator, 
  CalendarCheck, 
  Code2, 
  Cpu, 
  Building2
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, openTechModal }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'employees', label: 'Employee Directory', icon: Users },
    { id: 'payroll', label: 'Payroll & Tax Engine', icon: Calculator },
    { id: 'leaves', label: 'Attendance & Leaves', icon: CalendarCheck },
  ];

  return (
    <aside className="app-sidebar">
      {/* Brand Header */}
      <div className="p-4 border-bottom border-dark d-flex align-items-center gap-3">
        <div className="bg-primary text-white p-2 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px' }}>
          <Building2 size={24} />
        </div>
        <div>
          <h6 className="m-0 fw-bold text-white tracking-wide">Smart HR System</h6>
          <small className="text-muted" style={{ fontSize: '0.75rem' }}>Enterprise Edition v2.5</small>
        </div>
      </div>

      {/* Main Nav Items */}
      <div className="p-3 flex-grow-1">
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

        <div className="text-uppercase text-muted fw-semibold mt-4 mb-2 px-3" style={{ fontSize: '0.7rem', letterSpacing: '0.08em' }}>
          Architecture & Showcase
        </div>
        
        <button
          className="nav-link-custom w-100 text-start border-0 bg-transparent text-primary-emphasis"
          onClick={openTechModal}
          style={{ cursor: 'pointer' }}
        >
          <Code2 size={18} className="text-info" />
          <span className="text-info fw-semibold">Spring Boot & JUnit Code</span>
        </button>
      </div>

      {/* Developer Resume Reference Footer */}
      <div className="p-3 m-3 glass-card rounded-3 border-secondary-subtle">
        <div className="d-flex align-items-center gap-2 mb-2">
          <Cpu size={16} className="text-emerald" />
          <span className="fw-semibold text-light" style={{ fontSize: '0.8rem' }}>Developer Profile</span>
        </div>
        <div className="text-white fw-bold" style={{ fontSize: '0.85rem' }}>Abhijeet Mane</div>
        <small className="text-muted d-block mb-2" style={{ fontSize: '0.75rem' }}>Java Full Stack Developer</small>
        <span className="badge badge-tech d-inline-block" style={{ fontSize: '0.68rem' }}>
          Java 17 • Spring Boot • MySQL
        </span>
      </div>
    </aside>
  );
}
