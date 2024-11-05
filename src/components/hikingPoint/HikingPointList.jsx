import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteHikingPoint,
  fetchHikingPoint,
  updateHikingPoint,
} from "../../redux/feature/hikingPointSlice";
import { useEffect } from "react";
import CustomButton from "../CustomButton";

const HikingPointList = () => {
  const dispatch = useDispatch();
  const {
    hikingPoints = [],
    status,
    isError,
    error,
  } = useSelector((state) => state.hikingPoint);

  const mountainId = useSelector((state) => state.hikingPoint.mountainId);
  console.log("mountainId", mountainId);
  const handleUpdateHikingPoint = (idHikingPoint, data) => {
    dispatch(updateHikingPoint({ idHikingPoint, data }));
  };

  const handleDeleteHikingPoint = (idHikingPoint) => {
    const acceptdDelete = window.confirm(
      "Are you sure you want to delete this hiking point?"
    );
    if (!acceptdDelete) {
      return;
    }
    dispatch(deleteHikingPoint(idHikingPoint));
  };

  useEffect(() => {
    dispatch(fetchHikingPoint(mountainId));
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message || "An error occurred"}</div>;
  }

  return (
    <section className="flex flex-wrap gap-5 mt-5">
      {hikingPoints.map((hikingPoint) => (
        <Card
          key={hikingPoint?.id}
          variant="light"
          isPressable
          className="w-full"
          onPress={() => console.log("item pressed")}>
          <CardHeader>
            <p>{hikingPoint?.name || "Unnamed Hiking Point"}</p>
          </CardHeader>
          <CardBody css={{ py: "$6" }}>
            <p>
              Coordinate: {hikingPoint?.coordinate || "N/A"}
              <br />
              Price: {hikingPoint?.price || "N/A"}
            </p>
          </CardBody>
          <CardFooter className="flex items-center justify-between gap-4">
            <CustomButton
              onPress={() =>
                handleUpdateHikingPoint(hikingPointId, hikingPointUpdated)
              }>
              Edit
            </CustomButton>
            <CustomButton
              customStyles={"bg-error"}
              onPress={() => handleDeleteHikingPoint(hikingPoint?.id)}>
              Delete
            </CustomButton>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
};

export default HikingPointList;
