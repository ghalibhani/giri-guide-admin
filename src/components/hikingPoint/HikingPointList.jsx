import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteHikingPoint,
  fetchHikingPoint,
  updateHikingPoint,
} from "../../redux/feature/hikingPointSlice";
import { useEffect } from "react";

const HikingPointList = () => {
  const dispatch = useDispatch();
  const {
    hikingPoints = [],
    status,
    isError,
    error,
  } = useSelector((state) => state.hikingPoint);
  // const { mountainId } = useSelector((state) => {
  //   state.hikingPoint;
  // });
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
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {hikingPoints.map((hikingPoint) => (
        <Card
          key={hikingPoint?.id}
          variant="light"
          css={{ h: "100%" }}
          isPressable
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
          <CardFooter className="flex items-center justify-between">
            <Button
              auto
              rounded
              color="primary"
              size="sm"
              onPress={() =>
                handleUpdateHikingPoint(hikingPointId, hikingPointUpdated)
              }>
              Edit
            </Button>
            <Button
              auto
              rounded
              color="error"
              size="sm"
              onPress={() => handleDeleteHikingPoint(hikingPoint?.id)}>
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
};

export default HikingPointList;
