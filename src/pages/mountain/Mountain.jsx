import { useSelector } from "react-redux";
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

const Mountain = () => {
  const mountains = useSelector((state) => state.mountain.mountains || []);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure(false);

  return (
    <section className="w-96 font-inter">
      <h1>Mountain Management</h1>

      <CustomButton onClick={onOpen}>Add Mountain</CustomButton>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
