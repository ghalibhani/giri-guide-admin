import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const generateData = () => {
  const data = [];
  const currentDate = new Date();
  for (let i = 0; i < 12; i++) {
    const month = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    data.push({
      name: month.toLocaleString("default", {
        month: "short",
        year: "numeric",
      }),
      transactions: Math.floor(Math.random() * 1000),
      revenue: Math.floor(Math.random() * 5000),
      customers: Math.floor(Math.random() * 5000),
    });
  }
  return data.reverse();
};

const DashboardCharts = () => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const data = generateData();
    console.log(data);
    setChartData(data);
  }, []);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 30" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="transactions"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />

          <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
          <Line type="monotone" dataKey="customers" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardCharts;
