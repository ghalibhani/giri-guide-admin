import { useDispatch, useSelector } from "react-redux";
import FormMountain from "../../components/mountains/FormMountain";
import MountainList from "../../components/mountains/MountainList";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";

const Mountain = () => {
  const mountains = useSelector((state) => state.mountain.mountains || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure(false);
  console.log(mountains);

  return (
    <section className="font-inter h-full overflow-y-scroll">
      <h1 className="mb-5 text-3xl">Mountain Management</h1>

      <CustomButton onClick={onOpen}>Add Mountain</CustomButton>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="h-4/5 overflow-scroll">
        <ModalContent>
          {(closeModal) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Mountain
              </ModalHeader>
              <ModalBody>
                <FormMountain onClose={closeModal} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={closeModal}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <MountainList />
    </section>
  );
};

export default Mountain;
