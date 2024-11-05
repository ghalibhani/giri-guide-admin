import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import FormHikingPoint from "../../components/hikingPoint/FormHikingPoint";
import HikingPointList from "../../components/hikingPoint/HikingPointList";

const HikingPoint = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(false);

  return (
    <section className="flex flex-col gap-8">
      <h1>Hiking Point</h1>
      <FormHikingPoint isEdit={false} />
      <HikingPointList />
      <Modal
        isOpen={isOpen}
        // size="5xl"
        onOpenChange={(isOpen) => {
          console.log("Modal open state changed:", isOpen);
        }}
        className="h-4/5 overflow-scroll">
        <ModalContent>
          {(closeModal) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New HikingPoint
              </ModalHeader>
              <ModalBody>
                <FormHikingPoint
                  onClose={() => {
                    closeModal && closeModal();
                    console.log("Modal closed");
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={
                    onClose ? onClose : () => console.error("onClose is null")
                  }>
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

export default HikingPoint;
