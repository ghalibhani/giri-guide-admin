import RouteForm from "../../components/rute/RouteForm";
import RouteList from "../../components/rute/RouteList";

const Route = () => {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-mainSoil">Route Management</h1>
      <RouteForm />
      <RouteList />
    </section>
  );
};

export default Route;
