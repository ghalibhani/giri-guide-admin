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
import CustomButton from "../../components/CustomButton";

const Mountain = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure(false);
  return (
    <section className="font-inter h-full overflow-y-scroll">
      <h1 className="mb-5 text-3xl font-bold text-mainSoil">
        Mountain Management
      </h1>

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
                <FormMountain onClose={closeModal} formInput={true} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
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
