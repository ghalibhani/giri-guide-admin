import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useSelector } from "react-redux";
import CustomButton from "../CustomButton";

const TourGuideHikingPointList = () => {
  const mountains = useSelector((state) => state.tourGuide.mountains);
  //   const dispatch = useDispatch();
  return (
    <section className="flex flex-wrap gap-4">
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
              <section
                key={hikingPoint?.id}
                className="flex gap-4 mb-4 justify-between">
                <p key={hikingPoint?.id}>{hikingPoint?.name}</p>
                <CustomButton
                  customStyles={"bg-error"}
                  onPress={() => {
                    // dispatch(handleDeleteHikingPoint(hikingPoint?.id)
                  }}>
                  Delete
                </CustomButton>
              </section>
            ))}
          </CardBody>
        </Card>
      ))}
    </section>
  );
};

export default TourGuideHikingPointList;
