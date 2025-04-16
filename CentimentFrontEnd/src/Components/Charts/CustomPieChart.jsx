import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const CustomPieChart = ({ data }) => {
  // Define colors for the Pie chart sections
  const COLORS = ["#1D4ED8", "#EF4444", "#10B981"]; // Blue, Red, Green

  // Get total income to display inside the ring
  const totalIncome = data.find((item) => item.name === "Total Income")?.value || 0;

  return (
    <div className="relative w-full h-96 flex items-center justify-center">
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={90} // Makes it a bigger ring
            outerRadius={120} // Increase size for better visibility
            fill="#8884d8"
            label={false} // Removes extra labels
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" align="center" iconType="circle" />
        </PieChart>
      </ResponsiveContainer>

      {/* Display "Total Income: Amount" inside the ring */}
      <div className="absolute text-center">
        <p className="text-lg font-semibold text-gray-700">Total Income:</p>
        <p className="text-2xl font-bold text-blue-700">₹{totalIncome.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default CustomPieChart;
