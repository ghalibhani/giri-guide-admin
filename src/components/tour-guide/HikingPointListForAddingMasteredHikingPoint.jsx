import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import CustomButton from "../CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  addHikingPointIdSelected,
  fetchHikingPointByMountainId,
  removeHikingPointFromMountainId,
  setMountainIdForSelectingHikingPoint,
} from "../../redux/feature/tourGuideSlice";
import { IoArrowBackCircle } from "react-icons/io5";

const HikingPointListForAddingMasteredHikingPoint = () => {
  const dispatch = useDispatch();
  const {
    hikingPointFromMountainId,
    mountainIdForSelectingHikingPoint,
    mountainNameSelected,
  } = useSelector((state) => state.tourGuide);

  const handleSelectingHikingPoint = (id) => {
    dispatch(addHikingPointIdSelected(id));
    dispatch(removeHikingPointFromMountainId(id));
  };

  useEffect(() => {
    dispatch(fetchHikingPointByMountainId(mountainIdForSelectingHikingPoint));
  }, [dispatch, mountainIdForSelectingHikingPoint]);
  return (
    <div className="flex flex-col gap-4 h-full overflow-scroll mb-6">
      <section className="flex gap-4 w-full items-center">
        <IoArrowBackCircle
          className="text-5xl rounded-full text-errorHover"
          onClick={() => {
            dispatch(setMountainIdForSelectingHikingPoint(null));
          }}
        />
        <h1 className="text-xl font-bold text-mainSoil">
          Select hiking point from {mountainNameSelected}
        </h1>
      </section>
      <h1>List Hiking Point</h1>
      <section className="px-6 flex flex-col gap-4">
        {hikingPointFromMountainId?.map((hikingPoint) => (
          <Card
            key={hikingPoint?.id}
            variant="light"
            isPressable
            className="w-full px-6 py-4"
            onPress={() => {
              handleSelectingHikingPoint(hikingPoint.id);
            }}>
            <CardHeader>
              <p>{hikingPoint?.name || "Unnamed Hiking Point"}</p>
            </CardHeader>

            <CardBody>
              <p>
                Coordinate: {hikingPoint?.coordinate || "N/A"}
                <br />
                Price: {hikingPoint?.price || "N/A"}
              </p>
            </CardBody>

            <CardFooter className="flex items-center justify-between gap-4">
              <CustomButton
                onPress={() => {
                  handleSelectingHikingPoint(hikingPoint.id);
                }}>
                Select
              </CustomButton>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default HikingPointListForAddingMasteredHikingPoint;
