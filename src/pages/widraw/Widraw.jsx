import { useSelector } from "react-redux";
import WidrawList from "../../components/widraw/WidrawList";
import HamsterLoading from "../../components/HamsterLoading";

const Widraw = () => {
  const status = useSelector((state) => state.tourGuide.status);
  console.log(status);
  return (
    <div>
      {status === "loading" && <HamsterLoading />}
      <h1>Widraw</h1>
      <WidrawList />
    </div>
  );
};

export default Widraw;
