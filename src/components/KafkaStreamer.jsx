import React, { useState, useEffect } from 'react';
import { Terminal, Pause, Play } from 'lucide-react';

export default function KafkaStreamer() {
  const [logs, setLogs] = useState([
    "[KAFKA-BUS] Initialized partition offset #10492 for topic 'event.payroll.processed'",
    "[SPRING-BOOT] Worker thread [pool-1-thread-4] consumed batch event ID #EVT-9921",
    "[MYSQL-CLUSTER] Covering index hit: idx_payroll_batch (Execution: 0.42ms)"
  ]);
  const [isStreaming, setIsStreaming] = useState(true);

  useEffect(() => {
    if (!isStreaming) return;

    const sampleTopics = [
      "event.payroll.processed",
      "event.tax.deducted",
      "event.employee.onboarded",
      "event.payslip.disbursed",
      "event.jwt.authenticated"
    ];

    const interval = setInterval(() => {
      const topic = sampleTopics[Math.floor(Math.random() * sampleTopics.length)];
      const timestamp = new Date().toLocaleTimeString();
      const offset = Math.floor(Math.random() * 90000) + 10000;
      const newLog = `[${timestamp}] [KAFKA-BUS] [${topic}] Partition 0 @ Offset #${offset} - ACK Received (Latency 12ms)`;

      setLogs((prev) => [newLog, ...prev.slice(0, 15)]);
    }, 2500);

    return () => clearInterval(interval);
  }, [isStreaming]);

  return (
    <div className="glass-card p-3 mb-4">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div className="d-flex align-items-center gap-2">
          <Terminal size={18} className="text-info" />
          <h6 className="fw-bold text-white m-0" style={{ fontSize: '0.9rem' }}>
            Apache Kafka Asynchronous Event Streamer
          </h6>
        </div>
        <button
          className="btn btn-sm btn-outline-secondary rounded-pill px-3 text-light d-flex align-items-center gap-1"
          onClick={() => setIsStreaming(!isStreaming)}
        >
          {isStreaming ? <Pause size={12} /> : <Play size={12} />}
          <span style={{ fontSize: '0.75rem' }}>{isStreaming ? 'Pause Stream' : 'Resume Stream'}</span>
        </button>
      </div>

      <div className="terminal-box">
        {logs.map((log, idx) => (
          <div key={idx} className="mb-1" style={{ whiteSpace: 'nowrap' }}>
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}
