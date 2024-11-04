import { useDispatch, useSelector } from "react-redux";
import {
  deleteMountain,
  fetchMountain,
  updateMountain,
} from "../../redux/feature/mountainSlice";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Modal,
  Pagination,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import FormMountain from "./FormMountain";

const MountainList = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [mountainsPerPage] = useState(2);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [selectedMountain, setSelectedMountain] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const mountains = useSelector((state) => state.mountain.mountains || []);
  const paging = useSelector(
    (state) =>
      state.mountain.paging || {
        page: 1,
        size: 0,
        totalPages: 0,
        totalElements: 0,
      }
  );

  const handleDelete = (id) => {
    if (!id) {
      setError("Invalid mountain id");
      return;
    }
    try {
      setIsConfirmDelete(true);
      setTimeout(() => {
        dispatch(deleteMountain(id))
          .then(() => {
            dispatch(
              fetchMountain({ page: currentPage, limit: mountainsPerPage })
            );
          })
          .catch((err) => setError(err.message));
        setIsConfirmDelete(false);
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = (newMountain) => {
    if (!newMountain || !newMountain.id) {
      setError("Invalid mountain data");
      return;
    }
    try {
      dispatch(updateMountain(newMountain))
        .then(() => setIsUpdateModalOpen(false))
        .catch((err) => setError(err.message));
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    try {
      dispatch(
        fetchMountain({ page: currentPage, limit: mountainsPerPage })
      ).catch((err) => setError(err.message));
    } catch (error) {
      setError(error.message);
    }
  }, [dispatch, currentPage, mountainsPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleClose = () => {
    setError(null);
    setMessage(null);
  };

  return (
    <section className="mt-5 flex flex-col gap-5">
      {error && (
        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={!!error}
          onClose={handleClose}>
          <Modal.Header>
            <h3 id="modal-title">Error</h3>
          </Modal.Header>
          <Modal.Body>{error}</Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {message && (
        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={!!message}
          onClose={handleClose}>
          <Modal.Header>
            <h3 id="modal-title">Message</h3>
          </Modal.Header>
          <Modal.Body>{message}</Modal.Body>
          <Modal.Footer>
            <Button auto flat color="success" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {isConfirmDelete && (
        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={isConfirmDelete}
          onClose={() => setIsConfirmDelete(false)}>
          <Modal.Header>
            <h3 id="modal-title">Confirm Delete</h3>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this mountain?
          </Modal.Body>
          <Modal.Footer>
            <Button
              auto
              flat
              color="error"
              onClick={() => setIsConfirmDelete(false)}>
              Cancel
            </Button>
            <Button
              auto
              flat
              color="success"
              onClick={() => setIsConfirmDelete(false)}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {isUpdateModalOpen && selectedMountain && (
        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}>
          <Modal.Header>
            <h3 id="modal-title">Update Mountain</h3>
          </Modal.Header>
          <Modal.Body>
            <FormMountain
              isEdit={true}
              id={selectedMountain.id}
              onClose={() => setIsUpdateModalOpen(false)}
            />
          </Modal.Body>
        </Modal>
      )}
      <section className="flex flex-wrap gap-5">
        {mountains.map((mountain) => {
          if (!mountain || !mountain.id) {
            console.error("Invalid mountain data:", mountain);
            return null;
          }
          return (
            <section
              key={mountain.id}
              className="flex gap-4 justify-between mb-5">
              <section className="flex flex-1 justify-between">
                <Card
                  shadow="sm"
                  key={mountain.id}
                  isPressable
                  onPress={() => console.log("item pressed")}>
                  <CardBody className="overflow-visible p-0">
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt={mountain.name || "Mountain Image"}
                      className="w-full object-cover h-[140px]"
                      src={mountain.image}
                    />
                  </CardBody>
                  <CardFooter className="text-small justify-between gap-5">
                    <b>{mountain.name}</b>
                    <section className="buttonGroup flex gap-5">
                      <Button
                        onClick={() => handleDelete(mountain.id)}
                        className="text-neutral-50 bg-error hover:bg-successfulHover font-bold">
                        Delete
                      </Button>
                      <Button
                        className="text-neutral-50 bg-successful hover:bg-successfulHover font-bold"
                        onClick={() => {
                          setSelectedMountain(mountain.id);
                          setIsUpdateModalOpen(true);
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
      </section>
      <Pagination
        total={paging.totalPages}
        initialPage={paging.page}
        onChange={(page) => paginate(page)}
      />
    </section>
  );
};

export default MountainList;
