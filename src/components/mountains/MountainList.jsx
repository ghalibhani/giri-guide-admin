import { useDispatch, useSelector } from "react-redux";
import {
  deleteMountain,
  fetchMountain,
} from "../../redux/feature/mountainSlice";
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
import { useEffect, useState } from "react";
import FormMountain from "./FormMountain";
import {
  addMountainId,
  fetchHikingPoint,
} from "../../redux/feature/hikingPointSlice";
import { useNavigate } from "react-router-dom";
const MountainList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [mountainsPerPage] = useState(5);
  const [idForEditingMountain, setIdForEditingMountain] = useState(null);
  const selectedMountain = useSelector(
    (state) => state.mountain.selectedMountain
  );
  const mountains = useSelector((state) => state.mountain.mountains || []);
  const status = useSelector((state) => state.mountain.status);
  // const mountainId = useSelector((state) => state.hikingPoint.mountainId);
  const paging = useSelector(
    (state) =>
      state.mountain.paging || {
        page: 1,
        size: 0,
        totalPages: 0,
        totalElements: 0,
      }
  );
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure(false);

  const handleDelete = (id) => {
    const isReadyForDelete = confirm(
      "Yakin ingin mengedit gunung dengan id ini ?"
    );
    if (!isReadyForDelete) {
      return;
    }

    dispatch(deleteMountain(id));
    dispatch(fetchMountain({ page: currentPage, limit: mountainsPerPage }));
  };

  useEffect(() => {
    console.log(selectedMountain);
  }, [selectedMountain, dispatch]);

  const handleUpdate = (id) => {
    if (!id) {
      alert("Id is required for update");
      return;
    }
    try {
      setIdForEditingMountain(id);
      onOpen();
    } catch (error) {
      alert(error?.message);
    }
  };
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    try {
      dispatch(fetchMountain({ page: currentPage, limit: mountainsPerPage }));
    } catch (error) {
      alert(error?.message);
    }
  }, [dispatch, currentPage, mountainsPerPage]);

  return (
    <section className="mt-5 flex flex-col gap-5">
      <Modal
        isOpen={isOpen}
        size="xl"
        onOpenChange={onOpenChange}
        className="h-4/5 overflow-scroll w-full">
        <ModalContent>
          {(closeModal) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Mountain
              </ModalHeader>
              <ModalBody>
                {/* <section className="flex gap-5 w-full px-5 py-2"> */}
                <FormMountain
                  onClose={closeModal}
                  isEdit={true}
                  id={idForEditingMountain}
                />
                {/* <section className="w-full">
                    <FormHikingPoint onClose={closeModal} />
                    <HikingPointList id={selectedMountain.id} />
                  </section>
                </section> */}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={async () => {
                    await dispatch(addMountainId(selectedMountain?.id));
                    await dispatch(fetchHikingPoint(selectedMountain?.id));
                    await dispatch(addMountainId(selectedMountain?.id));
                    navigate("/hiking-point");
                  }}>
                  Manage Hiking Point
                </Button>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <section className="flex flex-wrap gap-5">
        {status === "loading" ? (
          <div>Loading...</div>
        ) : (
          <>
            {mountains.map((mountain) => {
              if (!mountain || !mountain?.id) {
                console.error("Invalid mountain data:", mountain);
                return null;
              }
              return (
                <section
                  key={mountain?.id}
                  className="flex gap-4 justify-between mb-5">
                  <section className="flex flex-1 justify-between">
                    <Card
                      shadow="sm"
                      key={mountain?.id}
                      isPressable
                      onPress={() => console.log("item pressed")}>
                      <CardBody className="overflow-visible p-0">
                        <Image
                          shadow="sm"
                          radius="lg"
                          width="100%"
                          alt={mountain?.name || "Mountain Image"}
                          className="w-full object-cover h-[140px]"
                          src={mountain?.image}
                        />
                      </CardBody>
                      <CardFooter className="text-small justify-between gap-5">
                        <b>{mountain?.name}</b>
                        <section className="buttonGroup flex gap-5">
                          <Button
                            onClick={() => handleDelete(mountain?.id)}
                            className="text-neutral-50 bg-error hover:bg-successfulHover font-bold">
                            Delete
                          </Button>
                          <Button
                            className="text-neutral-50 bg-successful hover:bg-successfulHover font-bold"
                            onClick={() => {
                              handleUpdate(mountain?.id);
                            }}>
                            Update
                          </Button>
                        </section>
                      </CardFooter>
                    </Card>
                  </section>
                </section>
              );
            })}
          </>
        )}
      </section>

      <Pagination
        total={paging?.totalPages}
        initialPage={paging?.page}
        onChange={(page) => paginate(page)}
      />
    </section>
  );
};

export default MountainList;
