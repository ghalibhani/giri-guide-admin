import { useSelector } from "react-redux";
import WidrawList from "../../components/widraw/WidrawList";

const Widraw = () => {
  const status = useSelector((state) => state.tourGuide.status);
  console.log(status);
  return (
    <div>
      {status === "loading" && <div>Loading...</div>}
      <h1>Widraw</h1>
      <WidrawList />
    </div>
  );
};

export default Widraw;
