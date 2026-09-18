# 🏢 Enterprise HR & Payroll Management System

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=flat-square&logo=bootstrap)](https://getbootstrap.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.5-FF6384?style=flat-square&logo=chart.js)](https://www.chartjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

A modern, high-performance **Enterprise HR & Payroll Management Web Application** designed for scale, real-time tracking, and automated payroll operations. Built with React 19, Vite, Bootstrap 5, and Chart.js.

---

## 🌟 Key Features

### 📊 Executive Dashboard & Analytics
- **Live KPI Metrics**: Real-time tracking of Total Employees, Monthly Payroll Spend, Active Leaves, and System Health.
- **Interactive Visualizations**: Payroll trend analysis and Department Headcount distribution charts powered by Chart.js.
- **Real-Time Activity Stream**: Integrated event logger for audit trails.

### 👥 Employee Management Directory
- **Filterable Employee Registry**: Search by name, role, department, or employment status.
- **Detailed Profiles**: Full view of compensation breakdowns, tax IDs, contact details, and department allocations.
- **Instant Payslip Generation**: One-click generation of professional itemized payslips.

### 💸 Automated Payroll Engine
- **Batch Processing**: Run monthly payroll across entire departments with automated deduction & bonus calculations.
- **Itemized Calculation**: Automatic computation of Gross Salary, Tax (HRA, EPF, Professional Tax), Allowances, and Net Salary.
- **Historical Logs**: Maintain verifiable historical records of past payroll disbursements.

### 📅 Leave & Attendance Management
- **Leave Request Tracking**: Monitor Casual, Sick, and Earned Leave applications.
- **Approval Workflow**: Single-click approve or reject actions with instant quota adjustments.
- **Quota Overview**: Real-time tracking of remaining leave balances per employee.

### ⚡ Enterprise Microservices Architecture Visualizer
- **Interactive Topology**: Visual representation of underlying backend services (*Auth Service, Employee Microservice, Payroll Engine, Notification Service, Kafka Event Bus, MySQL Cluster*).
- **Live Kafka Streaming**: Simulated real-time event streaming ticker showing event payloads and topic messages.
- **Architecture Deep-Dive**: Built-in technical specifications modal with database schema layouts and performance metrics (+35% query optimization).

### 🎨 Theme & UI/UX
- **Modern Design**: Dark & Light mode toggle with glassmorphism UI elements and micro-animations.
- **Responsive Layout**: Fully adaptive navigation sidebar and mobile-friendly viewports.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 19 (Hooks, Context/State) |
| **Build Tool & Bundler** | Vite 8.3 |
| **Styling & UI** | Custom CSS3 Tokens, Bootstrap 5, Lucide Icons |
| **Data Visualization** | Chart.js 4.5 & React-Chartjs-2 |
| **Linting & Quality** | Oxlint |

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- `npm` or `yarn` or `pnpm`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/hr-payroll-system.git
   cd hr-payroll-system
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173/`.

4. **Build for Production**:
   ```bash
   npm run build
   ```
   The production-ready assets will be generated in the `dist/` directory.

---

## 📂 Project Structure

```
hr-payroll-system/
├── public/                 # Static assets & favicons
├── src/
│   ├── components/         # Modular React components
│   │   ├── Dashboard.jsx
│   │   ├── EmployeeDirectory.jsx
│   │   ├── Header.jsx
│   │   ├── KafkaStreamer.jsx
│   │   ├── LeaveManagement.jsx
│   │   ├── MicroservicesTopology.jsx
│   │   ├── PayrollEngine.jsx
│   │   ├── PayslipModal.jsx
│   │   ├── Sidebar.jsx
│   │   ├── TechArchitectureModal.jsx
│   │   └── ToastContainer.jsx
│   ├── data/               # Initial state & architecture documentation data
│   │   ├── codeSnippets.js
│   │   └── initialData.js
│   ├── App.jsx             # Main Application Component
│   ├── index.css           # Design Tokens & Theme Styles
│   └── main.jsx            # React Root Entrypoint
├── .gitignore              # Git Ignore configuration
├── index.html              # HTML5 Template
├── package.json            # Project manifest & scripts
└── vite.config.js          # Vite configuration
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
