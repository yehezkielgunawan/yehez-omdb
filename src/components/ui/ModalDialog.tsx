import {
  Button,
  Center,
  Img,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

type ModalDialogComponentType = {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
};

const ModalDialogComponent = ({
  isOpen,
  onClose,
  imageSrc,
}: ModalDialogComponentType) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Close Up Poster</ModalHeader>
        <ModalBody>
          <Center>
            <Img src={imageSrc} maxW="320px" />
          </Center>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalDialogComponent;
