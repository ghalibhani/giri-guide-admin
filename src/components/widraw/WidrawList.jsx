import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Pagination } from "@nextui-org/react";
import {
  aproveOrRejectWidraw,
  fetchWidraw,
} from "../../redux/feature/widrawSlice";
import CustomButton from "../CustomButton";

const WidrawList = () => {
  const dispatch = useDispatch();
  const { widraws, paging } = useSelector((state) => state.widraw);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [selectedWidrawId, setSelectedWidrawId] = useState(null);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure(false);
  const [message, setMessage] = useState("");

  const handleChangePagination = (page) => {
    setPage(page);
  };

  const handleApproveWidraw = (id) => {
    const isApproved = confirm("Yakin ingin menyetujui penarikan?");
    if (!isApproved) {
      return;
    }
    dispatch(aproveOrRejectWidraw({ id, approved: true }));
  };

  const openModalForRejectedWidraw = (id) => {
    setSelectedWidrawId(id);
    onOpen();
  };

  const handleRejectWidraw = () => {
    if (selectedWidrawId) {
      dispatch(
        aproveOrRejectWidraw({ id: selectedWidrawId, approved: false, message })
      );
    }
  };

  useEffect(() => {
    dispatch(fetchWidraw({ status, page, size }));
  }, []);

  useEffect(() => {
    dispatch(fetchWidraw({ status, page, size }));
  }, [status, page, size]);

  return (
    <section>
      <Select
        label="Status Widraw"
        placeholder="Pilih status widraw"
        size="sm"
        bordered
        value={status}
        onChange={(e) => setStatus(e.target.value)}>
        <SelectItem value="" key={"all"}>
          All
        </SelectItem>
        <SelectItem value="PENDING" key={"pending"}>
          Pending
        </SelectItem>
        <SelectItem value="IN" key={"in"}>
          In
        </SelectItem>
        <SelectItem value="OUT" key={"out"}>
          Out
        </SelectItem>
        <SelectItem value="REJECTED" key={"rejected"}>
          Rejected
        </SelectItem>
      </Select>
      <ul>
        {widraws.map((widraw) => (
          <li
            key={widraw.id}
            className="flex gap-2 w-full justify-between mb-2">
            <p>
              {widraw.tourGuideName} - {widraw.nominal} - {widraw.status} -{" "}
              {widraw.description}
            </p>
            {widraw.status === "PENDING" && (
              <section className="flex gap-4">
                <CustomButton
                  customStyles={"bg-error"}
                  onPress={() => {
                    onOpen();
                    openModalForRejectedWidraw(widraw.id);
                  }}
                  text="Reject">
                  Reject
                </CustomButton>
                <CustomButton
                  customStyles={"bg-success"}
                  onPress={() => {
                    handleApproveWidraw(widraw.id);
                  }}
                  text="Approve">
                  Approve
                </CustomButton>
              </section>
            )}
          </li>
        ))}
      </ul>
      <Pagination
        total={paging?.totalPages}
        page={page}
        onChange={handleChangePagination}
        rowsPerPage={size}
        rounded
      />
      <Modal
        isOpen={isOpen}
        // size="5xl"
        onOpenChange={onOpenChange}
        className="h-4/5 overflow-scroll">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Rejecting Widraw
              </ModalHeader>
              <ModalBody>
                <p>Yakin ingin menolak penarikan ini?</p>
                <Input
                  label="Alasan penolakan"
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={handleRejectWidraw}>
                  Reject
                </Button>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
};

export default WidrawList;
