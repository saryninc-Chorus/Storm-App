
import React, { useState } from "react";
import { AdminOnly } from "./AdminOnly";
import { guardians, innerCircle, specialCommands } from "../services/aiService";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "guardians", label: "Guardians" },
  { key: "innerCircle", label: "Inner Circle" },
  { key: "quantumCommands", label: "Quantum Commands" },
  // Add more nav items as you add features
];

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <AdminOnly>
      <div className="min-h-screen bg-zinc-950 text-white p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <nav className="mb-8 flex gap-4">
          {NAV_ITEMS.map(item => (
            <button
              key={item.key}
              className={`px-4 py-2 rounded ${activeTab === item.key ? "bg-yellow-500 text-black" : "bg-zinc-800"}`}
              onClick={() => setActiveTab(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div>
          {activeTab === "dashboard" && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Welcome, Admin!</h2>
              <p>This is your control center. Select a tab to manage features.</p>
            </div>
          )}
          {activeTab === "guardians" && (
            <section>
              <h2 className="text-xl font-semibold mb-4">Guardians</h2>
              <ul>
                {guardians.map(g => (
                  <li key={g.name} className="mb-4">
                    <strong>{g.icon} {g.name}</strong>: {g.title}<br />
                    <em>{g.systemInstruction}</em>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {activeTab === "innerCircle" && (
            <section>
              <h2 className="text-xl font-semibold mb-4">Inner Circle</h2>
              <ul>
                {innerCircle.map(m => (
                  <li key={m.designation} className="mb-4">
                    <strong>{m.icon} {m.designation}</strong>: {m.description}<br />
                    Assigned Guardian: {m.assignedGuardian}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {activeTab === "quantumCommands" && (
            <section>
              <h2 className="text-xl font-semibold mb-4">Special Quantum Commands</h2>
              <ul>
                {Object.entries(specialCommands).map(([cmd, details]) => (
                  <li key={cmd} className="mb-4">
                    <strong>{cmd}</strong>: {details.response || details.systemInstruction}
                    {details.switchToGuardian && <span> (Switches to: {details.switchToGuardian})</span>}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </AdminOnly>
  );
};

export default AdminPanel;
