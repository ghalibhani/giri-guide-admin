import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import axiosInstance from "../../api/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteTourGuide, fetchTourGuide, fetchTourGuideById, setIsTourGuideUpdating } from "../../redux/feature/tourGuideSlice";
import { addMountainId } from "../../redux/feature/hikingPointSlice";
import { setIsMountainUpdating } from "../../redux/feature/mountainSlice";

const TourGuideList = () => {
  const { tourGuides } = useSelector((state) => state.tourGuide);
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    if (!id) {
      alert("Id is required for delete");
      return;
    }

    const isReadyForDelete = confirm(
      `Yakin ingin menghapus gunung dengan id ${id}?`
    );
    if (!isReadyForDelete) {
      return;
    }

    try {
      dispatch(deleteTourGuide(id));
      dispatch(fetchTourGuide({ page: currentPage, limit: mountainsPerPage }));
    } catch (error) {
      alert(error?.message);
    }
  };

  const handleDetails = (mountain) => {
    if (!mountain.id) {
      alert("Id is required for update");
      return;
    }
    try {
      dispatch(fetchTourGuideById(mountain.id));
      dispatch(addMountainId(mountain.id));
      dispatch(setIsTourGuideUpdating(false))
      onOpen();
    } catch (error) {
      alert(error?.message);
    }
  };
  const handleUpdate = (tourGuide) => {
    if (!tourGuide || !tourGuide?.id) {
      console.error("No tour guide provided");
      return;
    }
    console.log("Update Tour Guide");

    console.log(tourGuide);
  };

  
  useEffect(() => {
    dispatch(fetchTourGuide({ page: 1, limit: 20 }));
  }, []);
  return (
    <section className="mt-5 flex flex-wrap gap-5">
      {tourGuides?.map((tourGuide) => {
        if (!tourGuide || !tourGuide?.id) {
          return null;
        }
        return (
          <section
            key={tourGuide?.id}
            className="flex gap-4 justify-between mb-5">
            <section className="flex flex-1 justify-between">
              <Card
                shadow="sm"
                key={tourGuide?.id}
                isPressable
                onPress={() => console.log("item pressed")}>
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={tourGuide?.name}
                    className="w-full object-cover h-[140px]"
                    src={tourGuide?.image}
                  />
                </CardBody>
                <CardFooter className="text-small justify-between gap-5">
                  <b>{tourGuide?.name}</b>
                  <section className="buttonGroup flex gap-5">
                    <Button
                      onClick={() => handleDelete(tourGuide?.id)}
                      className="text-neutral-50 bg-error hover:bg-successfulHover font-bold">
                      Delete
                    </Button>
                    <Button
                      className="text-neutral-50 bg-successful hover:bg-successfulHover font-bold"
                      onClick={() => {
                        handleDetails(tourGuides);
                      }}>
                      Details
                    </Button>
                  </section>
                </CardFooter>
              </Card>
            </section>
          </section>
        );
      })}
    </section>
  );
};
export default TourGuideList;
