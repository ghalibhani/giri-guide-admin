import { useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { fetchDashboard } from "../../redux/feature/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";

const StatusPieChart = () => {
  const dispatch = useDispatch();
  const dashboardData = useSelector((state) => state.dashboard.dashboardData);

  const COLORS = {
    UPCOMING: "#0088FE",
    DONE: "#00C49F",
    REJECTED: "#FF5733",
    WAITING_PAY: "#FFBB28",
    WAITING_APPROVE: "#FF8042",
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
        {/* {dashboardData[index].value} */}
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  useEffect(() => {
    const current = new Date();
    const month = current.getMonth() + 1;
    const year = current.getFullYear();
    console.log(month, year);
    dispatch(fetchDashboard({ month, year }));
  }, []);
  return (
    <div className="flex flex-col items-center w-full relative -top-6 h-[500px]">
      <section>
        <h2 className="text-4xl text-mainSoil text-center font-extrabold my-6">
          Transaction status
        </h2>
      </section>
      <section className="w-full h-full flex justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={700} height={700}>
            <Pie
              data={dashboardData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value">
              {dashboardData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <section className="flex gap-4 relative flex-col justify-center">
          <span className="font-bold bg-[#0088FE] text-white px-4 py-2 rounded-sm text-xs">
            UPCOMING
          </span>
          <span className="font-bold bg-[#00C49F] text-white px-4 py-2 rounded-sm text-xs">
            DONE
          </span>
          <span className="font-bold  bg-[#FF5733] text-white px-4 py-2 rounded-sm text-xs">
            REJECTED
          </span>
          <span className="font-bold bg-[#FFBB28] text-white px-4 py-2 rounded-sm text-xs">
            WAITING PAY
          </span>
          <span className="font-bold bg-[#FF8042] text-white px-4 py-2 rounded-sm text-xs">
            WAITING APPROVE
          </span>
        </section>
      </section>
    </div>
  );
};

export default StatusPieChart;
