"use client";
import React, { useState } from "react";
import { Info } from "lucide-react";

const RACIMatrix = () => {
  const [showLegend, setShowLegend] = useState(true);

  const roles = [
    "Project Lead",
    "Vice Project Lead",
    "Instructor",
    "Content Developer",
    "Logistics Coordinator",
    "Marketing Lead",
  ];

  const activities = [
    "Define workshop objectives and scope",
    "Develop curriculum and materials",
    "Schedule workshop sessions",
    "Recruit and onboard instructors",
    "Promote workshops to students",
    "Secure venue and equipment",
    "Deliver workshop instruction",
    "Provide hands-on student support",
    "Collect student feedback",
    "Evaluate workshop effectiveness",
    "Manage budget and resources",
    "Coordinate with department/faculty",
    "Update workshop content",
    "Handle student registrations",
  ];

  const matrix: Record<string, string[]> = {
    "Define workshop objectives and scope": ["A", "R", "C", "C", "I", "I"],
    "Develop curriculum and materials": ["A", "C", "R", "R", "I", "I"],
    "Schedule workshop sessions": ["A", "R", "C", "I", "R", "I"],
    "Recruit and onboard instructors": ["A", "R", "I", "I", "C", "I"],
    "Promote workshops to students": ["A", "C", "I", "I", "C", "R"],
    "Secure venue and equipment": ["A", "C", "I", "I", "R", "I"],
    "Deliver workshop instruction": ["I", "I", "A/R", "C", "I", "I"],
    "Provide hands-on student support": ["I", "C", "R", "I", "I", "I"],
    "Collect student feedback": ["A", "R", "C", "I", "R", "I"],
    "Evaluate workshop effectiveness": ["A", "R", "C", "C", "I", "I"],
    "Manage budget and resources": ["A/R", "C", "I", "I", "C", "I"],
    "Coordinate with department/faculty": ["A/R", "C", "I", "I", "I", "I"],
    "Update workshop content": ["A", "C", "R", "R", "I", "I"],
    "Handle student registrations": ["A", "C", "I", "I", "R", "I"],
  };

  const getColorClass = (value: string) => {
    switch (value) {
      case "R":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "A":
        return "bg-green-100 text-green-800 border-green-300";
      case "C":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "I":
        return "bg-gray-100 text-gray-600 border-gray-300";
      case "A/R":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      default:
        return "bg-white";
    }
  };

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Software Engineering Workshop Initiative
          </h1>
          <p className="text-gray-600 mb-4">
            RACI Matrix - Roles and Responsibilities
          </p>

          <button
            onClick={() => setShowLegend(!showLegend)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
          >
            <Info size={20} />
            <span className="font-medium">
              {showLegend ? "Hide" : "Show"} RACI Legend
            </span>
          </button>

          {showLegend && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                RACI Definitions:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-700">
                    R - Responsible:
                  </span>
                  <span className="text-gray-700">
                    Does the work to complete the task
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-green-700">
                    A - Accountable:
                  </span>
                  <span className="text-gray-700">
                    Ultimately answerable for completion
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-yellow-700">
                    C - Consulted:
                  </span>
                  <span className="text-gray-700">
                    Provides input and expertise
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-gray-600">I - Informed:</span>
                  <span className="text-gray-700">
                    Kept updated on progress
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="p-3 text-left font-semibold sticky left-0 bg-gray-800 z-10 min-w-64">
                    Activity / Role
                  </th>
                  {roles.map((role, idx) => (
                    <th
                      key={idx}
                      className="p-3 text-center font-semibold min-w-32 text-sm"
                    >
                      {role}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activities.map((activity: string, actIdx: number) => (
                  <tr
                    key={actIdx}
                    className={actIdx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td
                      className="p-3 font-medium text-gray-800 border-r border-gray-200 sticky left-0 z-10"
                      style={{
                        backgroundColor: actIdx % 2 === 0 ? "#f9fafb" : "white",
                      }}
                    >
                      {activity}
                    </td>
                    {matrix[activity].map((value: string, roleIdx: number) => (
                      <td
                        key={roleIdx}
                        className="p-2 text-center border-l border-gray-200"
                      >
                        <span
                          className={`inline-block px-3 py-1 rounded font-semibold border ${getColorClass(
                            value
                          )}`}
                        >
                          {value}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h3 className="font-bold text-gray-800 mb-3">Role Descriptions:</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Project Lead:</span> Overall
              initiative owner, strategic decisions, stakeholder management
            </p>
            <p>
              <span className="font-semibold">Vice Project Lead:</span> Supports
              project lead, coordinates operations, backup decision-maker
            </p>
            <p>
              <span className="font-semibold">Instructor:</span> Delivers
              workshop content, facilitates learning sessions
            </p>
            <p>
              <span className="font-semibold">Content Developer:</span> Creates
              and maintains workshop materials and exercises
            </p>
            <p>
              <span className="font-semibold">Logistics Coordinator:</span>{" "}
              Manages venues, equipment, schedules, registrations
            </p>
            <p>
              <span className="font-semibold">Marketing Lead:</span> Promotes
              workshops, manages communications and outreach
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RACIMatrix;
