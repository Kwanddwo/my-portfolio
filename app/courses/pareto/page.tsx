"use client";

import React from "react";
import {
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";

const ParetoChart = () => {
  // Raw data
  const rawData = [
    { issue: "Bad explanations", count: 8 },
    { issue: "Too advanced", count: 5 },
    { issue: "Difficult exercises", count: 2 },
    { issue: "Goal of workshop unclear", count: 1 },
    { issue: "Lack of microphones", count: 1 },
  ];

  // Calculate total
  const total = rawData.reduce((sum, item) => sum + item.count, 0);

  // Sort by count descending and calculate cumulative percentage
  let cumulative = 0;
  const chartData = rawData
    .sort((a, b) => b.count - a.count)
    .map((item) => {
      cumulative += item.count;
      const percentage = (item.count / total) * 100;
      const cumulativePercentage = (cumulative / total) * 100;
      return {
        issue: item.issue,
        count: item.count,
        percentage: percentage.toFixed(1),
        cumulative: cumulativePercentage.toFixed(1),
        cumulativeNum: parseFloat(cumulativePercentage.toFixed(1)),
      };
    });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border-2 border-indigo-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800 mb-2">
            {payload[0].payload.issue}
          </p>
          <p className="text-indigo-600">Count: {payload[0].value}</p>
          <p className="text-gray-600">
            Percentage: {payload[0].payload.percentage}%
          </p>
          <p className="text-orange-600 font-semibold">
            Cumulative: {payload[0].payload.cumulative}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-blue-50 p-8 overflow-auto">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Workshop Issues - Pareto Analysis
          </h1>
          <p className="text-gray-600">
            Identifying the vital few issues causing the most problems
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 my-12">
          <ResponsiveContainer width="100%" height={500}>
            <ComposedChart
              data={chartData}
              margin={{ top: 40, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="issue"
                angle={-45}
                textAnchor="end"
                height={120}
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                yAxisId="left"
                label={{
                  value: "Number of Occurrences",
                  angle: -90,
                  position: "left",
                  offset: 10,
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, 100]}
                label={{
                  value: "Cumulative %",
                  angle: 90,
                  position: "right",
                  offset: 10,
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="count"
                fill="#6366f1"
                name="Occurrences"
                radius={[8, 8, 0, 0]}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="cumulativeNum"
                stroke="#f97316"
                strokeWidth={3}
                name="Cumulative %"
                dot={{ fill: "#f97316", r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Key Insights
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-gray-800">
                    Top Issue (47.1%)
                  </p>
                  <p className="text-sm text-gray-600">
                    Content not explained well accounts for nearly half of all
                    complaints
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-gray-800">
                    Top 2 Issues (76.5%)
                  </p>
                  <p className="text-sm text-gray-600">
                    Content explanation and difficulty level represent over 3/4
                    of problems
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-gray-800">
                    80/20 Rule Applied
                  </p>
                  <p className="text-sm text-gray-600">
                    Focus on the top 2 issues to resolve 76.5% of complaints
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Data Summary
            </h2>
            <div className="space-y-2">
              {chartData.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-gray-100"
                >
                  <span className="text-sm text-gray-700 flex-1">
                    {item.issue}
                  </span>
                  <span className="font-semibold text-indigo-600 w-12 text-right">
                    {item.count}
                  </span>
                  <span className="text-sm text-gray-500 w-16 text-right">
                    {item.percentage}%
                  </span>
                  <span className="text-sm text-orange-600 w-20 text-right font-semibold">
                    {item.cumulative}%
                  </span>
                </div>
              ))}
              <div className="flex justify-between items-center py-2 font-bold border-t-2 border-gray-300">
                <span className="text-gray-800">Total</span>
                <span className="text-indigo-600 w-12 text-right">{total}</span>
                <span className="w-16 text-right">100%</span>
                <span className="w-20"></span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Recommended Actions
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-indigo-600 mb-2">
                Priority 1: Content Explanation
              </h3>
              <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>Add more examples and demonstrations</li>
                <li>Slow down pacing and check for understanding</li>
                <li>Provide visual aids and summaries</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-indigo-600 mb-2">
                Priority 2: Content Difficulty
              </h3>
              <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>Assess student level before workshop</li>
                <li>Lower workshop technical level</li>
                <li>Add foundational reviews at start</li>
                <li>
                  Provide supplementary resources to prepare before workshops
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParetoChart;
