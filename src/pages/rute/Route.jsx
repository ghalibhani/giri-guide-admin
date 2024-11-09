import RouteForm from "../../components/rute/RouteForm";
import RouteList from "../../components/rute/RouteList";

const Route = () => {
  return (
    <section className="flex flex-col">
      <h1>Route</h1>
      <RouteForm />
      <RouteList />
    </section>
  );
};

export default Route;
