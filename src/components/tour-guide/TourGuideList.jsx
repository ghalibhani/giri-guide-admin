import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  useDisclosure,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addTourGuideId,
  deleteTourGuide,
  fetchMasteredHikingPoint,
  fetchTourGuide,
  fetchTourGuideById,
  setIsTourGuideUpdating,
  setMountainIdForSelectingHikingPoint,
  setSelectedTourGuide,
} from "../../redux/feature/tourGuideSlice";
import FormTourGuide from "./FormTourGuide";
import TourGuideHikingPointList from "./TourGuideHikingPointList";
import AddMasteredHikingPoint from "./AddMasteredHikingPoint";
import HamsterLoading from "../HamsterLoading";

const TourGuideList = () => {
  const { tourGuides, paging, status } = useSelector(
    (state) => state.tourGuide
  );
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [mountainsPerPage] = useState(8);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(fetchTourGuide({ page: currentPage, limit: mountainsPerPage }));
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        console.error(error);
      }
    }
  }, [dispatch, currentPage, mountainsPerPage]);

  useEffect(() => {}, [tourGuides, paging]);

  const handleDelete = (id) => {
    if (!id) {
      alert("Id is required for delete");
      return;
    }

    try {
      const isReadyForDelete = confirm(
        `Yakin ingin menghapus gunung dengan id ${id}?`
      );
      if (!isReadyForDelete) {
        return;
      }

      dispatch(deleteTourGuide(id));
      dispatch(fetchTourGuide({ page: currentPage, limit: mountainsPerPage }));
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        console.error(error);
      }
    }
  };

  const handleDetails = (tourGuide) => {
    if (!tourGuide?.id) {
      alert("Id is required for update");
      return;
    }

    try {
      dispatch(fetchTourGuideById(tourGuide.id));
      dispatch(addTourGuideId(tourGuide.id));
      dispatch(fetchMasteredHikingPoint(tourGuide.id));
      dispatch(setIsTourGuideUpdating(false));
      onOpen();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    dispatch(fetchTourGuide({ page: 1, limit: 20 }));
  }, []);
  return (
    <>
      {status == "loading" && <HamsterLoading />}
      <section className="mt-5 flex flex-wrap gap-5">
        <Modal
          isOpen={isOpen}
          size="5xl"
          onOpenChange={onOpenChange}
          className="h-4/5 overflow-scroll">
          <ModalContent>
            {(closeModal) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add New Mountain
                </ModalHeader>
                <ModalBody>
                  <section className="flex gap-5 w-full px-5 py-2">
                    <FormTourGuide
                      onClose={() => {
                        closeModal();
                      }}
                    />
                    <section className="w-full">
                      <AddMasteredHikingPoint />
                      <TourGuideHikingPointList />
                    </section>
                  </section>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => {
                      onClose();
                      dispatch(setIsTourGuideUpdating(false));
                      dispatch(setSelectedTourGuide(null));
                      dispatch(setMountainIdForSelectingHikingPoint(null));
                    }}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        {tourGuides?.map((tourGuide) => {
          if (!tourGuide || !tourGuide?.id) {
            return null;
          }
          return (
            <section key={tourGuide?.id} className="mt-5 flex flex-col gap-5">
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
                          handleDetails(tourGuide);
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
      {paging?.totalPages > 1 && (
        <Pagination
          total={paging?.totalPages}
          initialPage={paging?.page}
          onChange={(page) => {
            paginate(page);
          }}
        />
      )}
    </>
  );
};
export default TourGuideList;
