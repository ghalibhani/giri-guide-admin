import { Card } from "@nextui-org/react";
import ChartCompose from "../components/dashboard/ChartCompose";
import ChartPie from "../components/dashboard/ChartPie";
// import Chart from "../components/dashboard/Chart";

const AdminDashboard = () => {
  const totalCompanyIncome = 1000000;
  const monthlyIncome = 500000;
  const newCustomers = 10;

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-4xl text-mainSoil text-center mb-6 font-extrabold">
        Admin Dashboard
      </h2>
      <section className="flex gap-6 justify-center items-center mb-12">
        <Card className="w-[31%] min-h-[200px]" isPressable isHoverable>
          <section className="w-full h-[200px] bg-green-100 flex justify-center items-center flex-col">
            <section>
              <h3 className="text-start font-bold text-2xl text-mainSoil">
                Total Company Income
              </h3>
              <p className="text-start font-semibold text-mainGreen text-xl">
                Rp {totalCompanyIncome.toLocaleString("id-ID")}
              </p>
            </section>
          </section>
        </Card>
        <Card className="w-[31%] min-h-[200px]" isPressable isHoverable>
          <section className="w-full h-[200px] bg-blue-100 flex justify-center items-center flex-col">
            <section>
              <h3 className="text-start font-bold text-2xl text-mainSoil">
                Total Income (Last Month)
              </h3>
              <p className="text-start font-semibold text-xl text-mainGreen">
                Rp {monthlyIncome.toLocaleString("id-ID")}
              </p>
            </section>
          </section>
        </Card>
        <Card className="w-[31%] min-h-[200px]" isPressable isHoverable>
          <section className="w-full h-[200px] bg-yellow-100 flex justify-center items-center flex-col">
            <section>
              <h3 className="text-start font-bold text-2xl text-mainSoil">
                New Customers (Last Month)
              </h3>
              <p className="text-start font-semibold text-xl text-mainGreen">
                {newCustomers.toLocaleString("id-ID")} customers
              </p>
            </section>
          </section>
        </Card>
      </section>
      <section className="flex">
        <ChartCompose />
        <ChartPie />
      </section>
    </section>
  );
};

export default AdminDashboard;
