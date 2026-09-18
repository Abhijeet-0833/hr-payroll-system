import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import EmployeeDirectory from './components/EmployeeDirectory';
import PayrollEngine from './components/PayrollEngine';
import LeaveManagement from './components/LeaveManagement';
import PayslipModal from './components/PayslipModal';
import TechArchitectureModal from './components/TechArchitectureModal';
import ToastContainer from './components/ToastContainer';
import { INITIAL_EMPLOYEES, INITIAL_LEAVES, PAYROLL_HISTORY } from './data/initialData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState('dark');
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [leaves, setLeaves] = useState(INITIAL_LEAVES);
  const [payrollHistory, setPayrollHistory] = useState(PAYROLL_HISTORY);
  
  // Toasts state
  const [toasts, setToasts] = useState([
    { id: 1, type: 'info', title: 'System Online', message: 'Spring Boot REST API & MySQL Cluster active (+35% speed)' }
  ]);

  // Modals state
  const [selectedPayslipEmp, setSelectedPayslipEmp] = useState(null);
  const [showTechModal, setShowTechModal] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    addToast('Theme Changed', `Switched UI mode to ${nextTheme.toUpperCase()}`, 'info');
  };

  const addToast = (title, message, type = 'success') => {
    setToasts((prev) => {
      const id = prev.length > 0 ? Math.max(...prev.map((t) => t.id)) + 1 : 1;
      const newToast = { id, title, message, type };
      setTimeout(() => {
        removeToast(id);
      }, 4500);
      return [newToast, ...prev];
    });
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // CSV Export Handler
  const handleExportCSV = () => {
    const headers = ["Employee ID", "Name", "Designation", "Department", "Basic Salary", "Net Salary", "Bank Account", "PAN"];
    const rows = employees.map(e => [
      e.id,
      `"${e.name}"`,
      `"${e.designation}"`,
      `"${e.department}"`,
      e.basicSalary,
      e.netSalary,
      e.bankAccount,
      e.pan
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Enterprise_Employee_Roster_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast("Export Successful", "Downloaded employee roster CSV file.", "success");
  };

  // Handlers
  const handleAddEmployee = (newEmp) => {
    setEmployees([newEmp, ...employees]);
    addToast("Staff Onboarded", `Added ${newEmp.name} to ${newEmp.department} department.`, "success");
  };

  const handleRunPayroll = (newRun) => {
    setPayrollHistory([newRun, ...payrollHistory]);
    addToast("Payroll Executed", `Processed ${newRun.processedCount} records in ${newRun.throughputMs}ms!`, "success");
  };

  const handleUpdateLeaveStatus = (leaveId, newStatus) => {
    setLeaves(
      leaves.map((l) => (l.id === leaveId ? { ...l, status: newStatus } : l))
    );
    addToast("Leave Status Updated", `Application ${leaveId} set to ${newStatus}.`, "info");
  };

  return (
    <div className="app-layout">
      {/* Fixed Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openTechModal={() => setShowTechModal(true)}
      />

      {/* Main Content Area */}
      <main className="app-main">
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          openTechModal={() => setShowTechModal(true)}
          onQuickOnboard={() => setActiveTab('employees')}
          onExportCSV={handleExportCSV}
        />

        {activeTab === 'dashboard' && (
          <Dashboard
            employees={employees}
            leaves={leaves}
            payrollHistory={payrollHistory}
            setActiveTab={setActiveTab}
            openTechModal={() => setShowTechModal(true)}
            addToast={addToast}
          />
        )}

        {activeTab === 'employees' && (
          <EmployeeDirectory
            employees={employees}
            onAddEmployee={handleAddEmployee}
            onViewPayslip={(emp) => setSelectedPayslipEmp(emp)}
          />
        )}

        {activeTab === 'payroll' && (
          <PayrollEngine
            employees={employees}
            payrollHistory={payrollHistory}
            onRunPayroll={handleRunPayroll}
            openTechModal={() => setShowTechModal(true)}
          />
        )}

        {activeTab === 'leaves' && (
          <LeaveManagement
            leaves={leaves}
            onUpdateLeaveStatus={handleUpdateLeaveStatus}
          />
        )}
      </main>

      {/* Floating Toast Container */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Modals */}
      {selectedPayslipEmp && (
        <PayslipModal
          employee={selectedPayslipEmp}
          onClose={() => setSelectedPayslipEmp(null)}
        />
      )}

      {showTechModal && (
        <TechArchitectureModal
          onClose={() => setShowTechModal(false)}
        />
      )}
    </div>
  );
}
