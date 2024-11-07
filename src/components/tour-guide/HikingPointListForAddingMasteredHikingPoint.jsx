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

const HikingPointListForAddingMasteredHikingPoint = () => {
  const dispatch = useDispatch();
  const {
    hikingPointFromMountainId,
    mountainIdForSelectingHikingPoint,
    hikingPointIdSelected,
  } = useSelector((state) => state.tourGuide);

  const handleSelectingHikingPoint = (id) => {
    dispatch(addHikingPointIdSelected(id));
    dispatch(removeHikingPointFromMountainId(id));
  };

  useEffect(() => {
    console.log("Hiking point selected", hikingPointIdSelected);
  }, [hikingPointIdSelected]);

  useEffect(() => {
    dispatch(fetchHikingPointByMountainId(mountainIdForSelectingHikingPoint));
  }, [dispatch, mountainIdForSelectingHikingPoint]);
  return (
    <div className="flex flex-col gap-4 h-full overflow-scroll">
      <section className="flex gap-4">
        <CustomButton
          onPress={() => {
            dispatch(setMountainIdForSelectingHikingPoint(null));
          }}>
          Back
        </CustomButton>
        <h1 className="w-28">Select hiking point</h1>
      </section>
      {hikingPointFromMountainId?.map((hikingPoint) => (
        <Card
          key={hikingPoint?.id}
          variant="light"
          isPressable
          className="w-full"
          onPress={() => console.log("item pressed")}>
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
    </div>
  );
};

export default HikingPointListForAddingMasteredHikingPoint;
