import React, { useState } from 'react';
import { Search, FileText, UserPlus } from 'lucide-react';

export default function EmployeeDirectory({ employees, onAddEmployee, onViewPayslip }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State for new employee
  const [newEmp, setNewEmp] = useState({
    name: '',
    designation: '',
    department: 'Engineering',
    email: '',
    basicSalary: 60000,
    pan: 'ABCDE1234F',
    bankAccount: 'HDFC12345678'
  });

  const departments = ['All', 'Engineering', 'Cloud & Infrastructure', 'Product', 'Quality Assurance'];

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          emp.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const handleCreateEmployee = (e) => {
    e.preventDefault();
    if (!newEmp.name || !newEmp.designation) return;

    const basic = Number(newEmp.basicSalary);
    const hra = basic * 0.4;
    const specialAllowance = basic * 0.3;
    const pfDeduction = basic * 0.12;
    const taxDeduction = basic * 0.10;
    const netSalary = basic + hra + specialAllowance - pfDeduction - taxDeduction;

    const created = {
      id: `EMP-${1000 + employees.length + 1}`,
      name: newEmp.name,
      designation: newEmp.designation,
      department: newEmp.department,
      email: newEmp.email || `${newEmp.name.toLowerCase().replace(/\s+/g, '.')}@smartsoftware.com`,
      joiningDate: new Date().toISOString().split('T')[0],
      type: 'Full-Time',
      status: 'Active',
      basicSalary: basic,
      hra: hra,
      specialAllowance: specialAllowance,
      pfDeduction: pfDeduction,
      taxDeduction: taxDeduction,
      netSalary: netSalary,
      bankAccount: newEmp.bankAccount,
      pan: newEmp.pan,
      attendanceDays: 22,
      totalWorkingDays: 22,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    };

    onAddEmployee(created);
    setShowAddModal(false);
    setNewEmp({
      name: '',
      designation: '',
      department: 'Engineering',
      email: '',
      basicSalary: 60000,
      pan: 'ABCDE1234F',
      bankAccount: 'HDFC12345678'
    });
  };

  return (
    <div className="employee-directory">
      {/* Directory Title Banner */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h4 className="fw-bold text-white m-0">Employee Staff Directory</h4>
          <small className="text-muted">Manage enterprise staff profiles, salary structures & payslip generations</small>
        </div>
        <button
          className="btn btn-primary d-flex align-items-center gap-2 rounded-pill px-4"
          onClick={() => setShowAddModal(true)}
        >
          <UserPlus size={18} />
          <span>+ Onboard New Staff</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-card p-3 mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-md-5">
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary text-muted">
                <Search size={16} />
              </span>
              <input
                type="text"
                className="form-control bg-dark border-secondary text-light"
                placeholder="Filter by name, ID, or designation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-7 d-flex align-items-center gap-2 overflow-auto">
            <span className="text-muted small fw-semibold me-2 d-none d-lg-inline">Department:</span>
            {departments.map((dept) => (
              <button
                key={dept}
                className={`btn btn-sm rounded-pill px-3 text-nowrap ${
                  selectedDept === dept ? 'btn-primary' : 'btn-outline-secondary text-light'
                }`}
                onClick={() => setSelectedDept(dept)}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Employees Table */}
      <div className="glass-card overflow-hidden">
        <div className="table-responsive">
          <table className="table table-custom mb-0">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Joining Date</th>
                <th>Basic Salary</th>
                <th>Net Monthly Pay</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    No matching staff members found.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <tr key={emp.id}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={emp.avatar}
                          alt={emp.name}
                          className="rounded-circle border border-primary"
                          style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                        />
                        <div>
                          <div className="fw-bold text-light">{emp.name}</div>
                          <small className="text-muted">{emp.designation} • <span className="text-info">{emp.id}</span></small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-tech">{emp.department}</span>
                    </td>
                    <td className="text-muted">{emp.joiningDate}</td>
                    <td className="text-light">₹{emp.basicSalary.toLocaleString('en-IN')}</td>
                    <td className="fw-bold text-emerald">₹{emp.netSalary.toLocaleString('en-IN')}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-info d-flex align-items-center gap-1 rounded-pill px-3"
                        onClick={() => onViewPayslip(emp)}
                      >
                        <FileText size={14} />
                        <span>View Payslip</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Onboard Employee Modal */}
      {showAddModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.75)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content glass-card border-secondary text-light">
              <div className="modal-header border-secondary">
                <h5 className="modal-title fw-bold text-white d-flex align-items-center gap-2">
                  <UserPlus size={20} className="text-primary" />
                  <span>Onboard New Enterprise Staff</span>
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>

              <form onSubmit={handleCreateEmployee}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label text-muted small fw-semibold">Full Name *</label>
                    <input
                      type="text"
                      className="form-control bg-dark border-secondary text-light"
                      required
                      placeholder="e.g. Rahul Deshmukh"
                      value={newEmp.name}
                      onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
                    />
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-md-6">
                      <label className="form-label text-muted small fw-semibold">Designation *</label>
                      <input
                        type="text"
                        className="form-control bg-dark border-secondary text-light"
                        required
                        placeholder="e.g. Java Backend Engineer"
                        value={newEmp.designation}
                        onChange={(e) => setNewEmp({ ...newEmp, designation: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label text-muted small fw-semibold">Department *</label>
                      <select
                        className="form-select bg-dark border-secondary text-light"
                        value={newEmp.department}
                        onChange={(e) => setNewEmp({ ...newEmp, department: e.target.value })}
                      >
                        <option value="Engineering">Engineering</option>
                        <option value="Cloud & Infrastructure">Cloud & Infrastructure</option>
                        <option value="Product">Product</option>
                        <option value="Quality Assurance">Quality Assurance</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-muted small fw-semibold">Monthly Basic Salary (₹) *</label>
                    <input
                      type="number"
                      className="form-control bg-dark border-secondary text-light"
                      required
                      value={newEmp.basicSalary}
                      onChange={(e) => setNewEmp({ ...newEmp, basicSalary: e.target.value })}
                    />
                    <small className="text-muted" style={{ fontSize: '0.72rem' }}>
                      Auto-computes: HRA (40%), Special Allowance (30%), PF (12%), Tax TDS (10%).
                    </small>
                  </div>
                </div>

                <div className="modal-footer border-secondary">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary px-4">
                    Complete Onboarding
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
