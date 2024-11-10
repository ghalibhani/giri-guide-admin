import { Card } from "@nextui-org/react";
import DashboardCharts from "../components/dashboard/Chart"; // Assuming correct path

const AdminDashboard = () => {
  const transactions = [
    { status: "Done", countLastMonth: 12, countLastYear: 12 },
    { status: "Rejected", countLastMonth: 3, countLastYear: 3 },
    { status: "Upcoming", countLastMonth: 3, countLastYear: 3 },
    { status: "Waiting Payment", countLastMonth: 3, countLastYear: 3 },
    { status: "Waiting Approval", countLastMonth: 3, countLastYear: 3 },
  ];

  const totalCompanyIncome = 1000000;
  const monthlyIncome = 500000;
  const newCustomers = 10;
  // const newCustomersPerYears = [
  //   { mont: "Jan", count: 10 },
  //   { mont: "Feb", count: 10 },
  //   { mont: "Mar", count: 10 },
  //   { mont: "Apr", count: 10 },
  //   { mont: "May", count: 10 },
  //   { mont: "Jun", count: 10 },
  //   { mont: "Jul", count: 10 },
  //   { mont: "Aug", count: 10 },
  //   { mont: "Sep", count: 10 },
  //   { mont: "Oct", count: 10 },
  //   { mont: "Nov", count: 10 },
  //   { mont: "Dec", count: 10 },
  // ];

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-4xl text-mainSoil text-center mb-6 font-extrabold">
        Admin Dashboard
      </h2>
      <section>
        <h2 className="text-2xl text-mainSoil mb-6 font-extrabold">
          Transactions
        </h2>
        <section className="flex gap-6 justify-evenly items-center flex-wrap">
          {transactions.map((status, index) => (
            <Card
              key={index}
              shadow="sm"
              isPressable
              isHoverable
              isBlurred
              className="">
              <section className="min-h-[250px] min-w-[250px] px-6 py-6 flex flex-col items-center justify-center bg-green-200">
                <section className="flex flex-col justify-start items-start">
                  <h3 className="text-2xl font-bold text-mainSoil mb-2">
                    {status.status}
                  </h3>
                  <p className="text-sm font-light text-mainGreen">
                    {status.countLastMonth.toLocaleString("id-ID")} transactions
                    (last month)
                  </p>
                  <p className="text-sm  font-light text-mainGreen">
                    {status.countLastYear.toLocaleString("id-ID")} transactions
                    (last year)
                  </p>
                </section>
              </section>
            </Card>
          ))}
        </section>
      </section>
      <section className="flex gap-6 justify-center items-center flex-wrap">
        <Card className="min-w-[300px] min-h-[300px] px-6 py-6">
          <h3>Total Company Income</h3>
          <p>Rp {totalCompanyIncome.toLocaleString("id-ID")}</p>
          <p>Rp {totalCompanyIncome.toLocaleString("id-ID")}</p>
        </Card>

        {/* Monthly Income */}
        <Card className="w-1/4 min-h-[300px] px-6 py-6">
          <h3>Total Income (Last Month)</h3>
          <p>Rp {monthlyIncome.toLocaleString("id-ID")}</p>
        </Card>

        {/* New Customers */}
        <Card className="w-1/4 min-h-[300px] px-6 py-6">
          <h3>New Customers (Last Month)</h3>
          <p>{newCustomers.toLocaleString("id-ID")} customers</p>
        </Card>
      </section>
      <DashboardCharts />
      <DashboardCharts />
    </section>
  );
};

export default AdminDashboard;
