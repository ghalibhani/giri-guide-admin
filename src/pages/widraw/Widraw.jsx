import { useSelector } from "react-redux";
import WidrawList from "../../components/widraw/WidrawList";
import HamsterLoading from "../../components/HamsterLoading";

const Widraw = () => {
  const status = useSelector((state) => state.tourGuide.status);
  console.log(status);
  return (
    <div className="flex flex-col gap-5">
      {status === "loading" && <HamsterLoading />}
      <h1 className="text-3xl font-bold text-mainSoil">Withdraw</h1>
      <WidrawList />
    </div>
  );
};

export default Widraw;
