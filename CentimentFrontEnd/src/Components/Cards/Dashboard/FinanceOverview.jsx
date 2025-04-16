import React from "react";
import CustomPieChart from "../../Charts/CustomPieChart";

const FinanceOverview = ({ tB, tI, tE }) => {
  // Pie chart data format
  const data = [
    { name: "Total Income", value: tI },
    { name: "Total Expenses", value: tE },
    { name: "Total Balance", value: tB },
  ];

  return (
    <div className="card">
      {/* Title */}
      <h5 className="text-2xl font-bold text-black mb-4">Finance Overview</h5>

      {/* Pie Chart */}
      <div className="mb-6">
        <CustomPieChart data={data} />
      </div>

      {/* Data Cards */}
      {/* Add any additional components or data cards below */}
    </div>
  );
};

export default FinanceOverview;
