import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../CustomButton";
import { deleteMasteredHikingPoint } from "../../redux/feature/tourGuideSlice"; //deleteMasteredHikingPoint
const TourGuideHikingPointList = () => {
  const { mountains, tourGuideId } = useSelector((state) => state.tourGuide);
  const dispatch = useDispatch();
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
                    dispatch(
                      deleteMasteredHikingPoint({
                        idHikingPoint: hikingPoint.id,
                        idTourGuide: tourGuideId,
                      })
                    );
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
