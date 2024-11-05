import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import CustomButton from "../../components/CustomButton";
import FormTourGuide from "../../components/tour-guide/FormTourGuide";
import TourGuideList from "../../components/tour-guide/TourGuideList";
import { useState } from "react";

const TourGuide = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <section className="font-inter h-full overflow-y-scroll">
      <h1 className="mb-5 text-3xl">Tour Guide Management</h1>

      <CustomButton onClick={handleOpenModal}>Add Tour Guide</CustomButton>
      <Modal
        isOpen={isOpenModal}
        onOpenChange={(open) => setIsOpenModal(open)} // pastikan modal terbuka/tutup sesuai state
      >
        <ModalContent>
          {(closeModal) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Tour Guide
              </ModalHeader>
              <ModalBody>
                <FormTourGuide onClose={handleCloseModal} />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={handleCloseModal} // pastikan modal tertutup dengan benar
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    // Proses penambahan data jika diperlukan, kemudian tutup modal
                    closeModal();
                  }}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <TourGuideList />
    </section>
  );
};

export default TourGuide;
