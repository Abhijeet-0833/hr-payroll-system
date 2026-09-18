import React, { useState } from 'react';
import { Activity, Zap } from 'lucide-react';

export default function MicroservicesTopology() {
  const [selectedService, setSelectedService] = useState('api-gateway');

  const services = [
    {
      id: 'api-gateway',
      name: 'Spring Cloud Gateway',
      type: 'Edge Proxy',
      status: 'Healthy',
      tech: 'Java 17 / Spring Boot 3',
      metrics: '4,200 req/sec • 99.9% Uptime',
      desc: 'Routes inbound REST traffic, enforces JWT token verification, and handles CORS and rate limiting.'
    },
    {
      id: 'payroll-service',
      name: 'Payroll Engine Service',
      type: 'Core Business Service',
      status: 'Healthy',
      tech: 'Spring Boot / Hibernate ORM',
      metrics: '890ms Batch Throughput (+35% Speed)',
      desc: 'Executes monthly salary calculations, tax TDS deductions, and PF allocations in bulk parallel streams.'
    },
    {
      id: 'kafka-bus',
      name: 'Apache Kafka Event Bus',
      type: 'Event Streaming',
      status: 'Active',
      tech: 'Kafka 3.4 Cluster',
      metrics: '10,000+ events/day • Zero Message Loss',
      desc: 'Handles asynchronous messaging for employee onboarding, payslip notifications, and tax audit logs.'
    },
    {
      id: 'db-cluster',
      name: 'MySQL 8 Database Cluster',
      type: 'Relational Store',
      status: 'Synced',
      tech: 'MySQL / InnoDB Covered Indexing',
      metrics: '40% Reduced Query Execution Time',
      desc: 'Stores employee records, salary structures, and historical payslips with composite covering indexes.'
    }
  ];

  const current = services.find(s => s.id === selectedService) || services[0];

  return (
    <div className="glass-card p-4 mb-4">
      <div className="d-flex align-items-center justify-content-between mb-3 border-bottom border-dark pb-3">
        <div>
          <h6 className="fw-bold text-white m-0 d-flex align-items-center gap-2">
            <Activity size={18} className="text-emerald" />
            <span>Interactive Microservices Topology & System Architecture</span>
          </h6>
          <small className="text-muted">Live view of active enterprise microservices, Kafka event queues, and MySQL cluster</small>
        </div>
        <span className="badge badge-status-active">Cluster 100% Operational</span>
      </div>

      {/* Topology Nodes Grid */}
      <div className="row g-3 mb-4">
        {services.map((srv) => (
          <div key={srv.id} className="col-md-3">
            <div
              className={`service-node cursor-pointer ${selectedService === srv.id ? 'border-primary bg-dark' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedService(srv.id)}
            >
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="badge badge-tech" style={{ fontSize: '0.7rem' }}>{srv.type}</span>
                <span className="badge bg-success text-dark" style={{ fontSize: '0.68rem' }}>{srv.status}</span>
              </div>
              <h6 className="fw-bold text-light mb-1" style={{ fontSize: '0.9rem' }}>{srv.name}</h6>
              <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>{srv.tech}</small>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Node Details Box */}
      <div className="bg-dark p-3 rounded-3 border border-secondary">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <div className="d-flex align-items-center gap-2">
            <Zap size={16} className="text-warning" />
            <h6 className="fw-bold text-warning m-0">{current.name} Specs</h6>
          </div>
          <span className="text-info fw-semibold" style={{ fontSize: '0.82rem' }}>{current.metrics}</span>
        </div>
        <p className="text-muted m-0" style={{ fontSize: '0.85rem' }}>
          {current.desc}
        </p>
      </div>
    </div>
  );
}
