import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const statusData = [
  { name: "UPCOMING", value: 10 },
  { name: "DONE", value: 20 },
  { name: "REJECTED", value: 5 },
  { name: "WAITING_PAY", value: 8 },
  { name: "WAITING_APPROVE", value: 15 },
];

// Define the colors for each status
const COLORS = {
  UPCOMING: "#0088FE", // Blue
  DONE: "#00C49F", // Green
  REJECTED: "#FF8042", // Red-Orange
  WAITING_PAY: "#FFBB28", // Yellow
  WAITING_APPROVE: "#FF5733", // Orange-Red
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central">
      {``}
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const StatusPieChart = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={statusData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value">
            {statusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <section className="flex gap-4">
        <span className="font-bold bg-[#0088FE] text-white px-2 py-1 rounded-sm text-xs">
          UPCOMING
        </span>
        <span className="font-bold bg-[#00C49F] text-white px-8 py-2 rounded-sm text-xs">
          DONE
        </span>
        <span className="font-bold bg-[#FF8042] text-white px-8 py-2 rounded-sm text-xs">
          REJECTED
        </span>
        <span className="font-bold bg-[#FFBB28] text-white px-8 py-2 rounded-sm text-xs">
          WAITING PAY
        </span>
        <span className="font-bold bg-[#FF5733] text-white px-8 py-2 rounded-sm text-xs">
          WAITING APPROVE
        </span>
      </section>
    </div>
  );
};

export default StatusPieChart;
