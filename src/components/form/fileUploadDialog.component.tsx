import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import FileUploadComponent from "../fileUpload.component";

interface CustomDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  handleImport?:  any
}

const FileUploadDialog: React.FC<CustomDialogProps> = ({
  isOpen,
  onClose,
  title,
  primaryActionLabel = "Confirm",
  onPrimaryAction,
  handleImport
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <FileUploadComponent handleImport={handleImport} />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="red"
            mr={3}
            onClick={onClose}
            _hover={{ bg: "red.500", color: "white" }}
            _focus={{ boxShadow: "none", outline: "none" }}
          >
            Close
          </Button>
          {onPrimaryAction && (
            <Button variant="ghost" onClick={onPrimaryAction}>
              {primaryActionLabel}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FileUploadDialog;
