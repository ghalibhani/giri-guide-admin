import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedHikingPoint,
  deleteHikingPoint,
  fetchHikingPoint,
  setIsUpdate,
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
    mountainId,
  } = useSelector((state) => state.hikingPoint);

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
    return <div>Error: {error?.message || "Error"}</div>;
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
                dispatch(addSelectedHikingPoint(hikingPoint));
                dispatch(setIsUpdate(true));
              }}>
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
