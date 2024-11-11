import { useEffect } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchRevenue } from "../../redux/feature/dashboardSlice";

const ChartCompose = () => {
  const revenueData = useSelector((state) => state.dashboard.revenueData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRevenue());
  }, []);

  return (
    <div className="flex flex-col items-center w-full relative -top-6 h-[500px]">
      <section>
        <h2 className="text-4xl text-mainSoil text-center mb-6 font-extrabold">
          Revenue
        </h2>
      </section>
      <ResponsiveContainer>
        <ComposedChart
          width={500}
          height={400}
          data={revenueData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            formatter={(value) =>
              new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(value)
            }
          />
          <Legend />
          <Bar dataKey="revenue" barSize={20} fill="#503a3a" />
          <Line type="monotone" dataKey="revenue" stroke="#503a3a" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartCompose;
