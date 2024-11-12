import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMasteredHikingPoint } from "../../redux/feature/tourGuideSlice"; //deleteMasteredHikingPoint
import { MdDelete } from "react-icons/md";
const TourGuideHikingPointList = () => {
  const { mountains, tourGuideId } = useSelector((state) => state.tourGuide);
  const dispatch = useDispatch();
  return (
    <section className="flex flex-wrap gap-4">
      {mountains.map((mountain) => (
        <Card key={mountain?.id} variant="light" isPressable className="w-full">
          <CardHeader>
            <p className="font-bold text-mainSoil text-xl">
              {mountain?.mountainName}
            </p>
          </CardHeader>

          <CardBody>
            {mountain.hikingPoints.map((hikingPoint) => (
              <section
                key={hikingPoint?.id}
                className="flex gap-4 mb-2 justify-between">
                <p className="text-mainGreen" key={hikingPoint?.id}>
                  {hikingPoint?.name}
                </p>
                <MdDelete
                  className="text-3xl rounded-full text-errorHover"
                  onClick={() => {
                    dispatch(
                      deleteMasteredHikingPoint({
                        idHikingPoint: hikingPoint.id,
                        idTourGuide: tourGuideId,
                      })
                    );
                  }}
                />
              </section>
            ))}
          </CardBody>
        </Card>
      ))}
    </section>
  );
};

export default TourGuideHikingPointList;
