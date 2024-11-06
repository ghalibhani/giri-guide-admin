import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { useSelector } from "react-redux";
import CustomButton from "../CustomButton";

const TourGuideHikingPointList = () => {
  const mountains = useSelector((state) => state.tourGuide.mountains);
  //   const dispatch = useDispatch();
  return (
    <section>
      {mountains.map((mountain) => (
        <Card
          key={mountain?.id}
          variant="light"
          isPressable
          className="w-full"
          onPress={() => console.log("item pressed")}>
          <CardHeader>
            <p>{mountain?.mountainName}</p>
          </CardHeader>

          <CardBody>
            {mountain.hikingPoints.map((hikingPoint) => (
              <p key={hikingPoint?.id}>{hikingPoint?.name}</p>
            ))}
          </CardBody>

          <CardFooter className="flex items-center justify-between gap-4">
            <CustomButton
              onPress={() => {
                // dispatch(addSelectedHikingPoint(hikingPoint));
                // dispatch(setIs(true));
              }}>
              Edit
            </CustomButton>
            <CustomButton
              customStyles={"bg-error"}
              onPress={() => {
                // dispatch(handleDeleteHikingPoint(hikingPoint?.id)
              }}>
              Delete
            </CustomButton>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
};

export default TourGuideHikingPointList;
