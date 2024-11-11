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

  console.log(revenueData);

  return (
    <div style={{ width: "100%", height: 300 }}>
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
