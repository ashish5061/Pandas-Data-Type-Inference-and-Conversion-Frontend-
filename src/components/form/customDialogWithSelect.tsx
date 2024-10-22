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
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { dataTypeOptions } from "../../constants/constants";

// Define the option type for Select
interface Option {
  value: string;
  label: string;
}

// Define form values interface with separate fields for each select
interface FormValues {
  CSVRow: Option | null;
  DataRow: Option | null;
}

interface CustomDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  options: Option[];
  primaryActionLabel?: string;
  onPrimaryAction?: (data: FormValues) => void;
}

const CustomDialogWithSelect: React.FC<CustomDialogProps> = ({
  isOpen,
  onClose,
  title,
  options,
  primaryActionLabel = "Confirm",
  onPrimaryAction,
}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      CSVRow: null,
      DataRow: null,
    },
  });

  const customStyles = {
    control: (base: any) => ({
      ...base,
      borderColor: errors.CSVRow ? "red" : base.borderColor,
      boxShadow: errors.CSVRow ? "0 0 0 1px red" : base.boxShadow,
      "&:hover": {
        borderColor: errors.CSVRow ? "red" : "blue",
      },
    }),
  }; 

  const onSubmit = async (data: FormValues) => {
    if (onPrimaryAction) {
      const isSuccess: any = await onPrimaryAction(data); // Call the primary action with selected data
      if (isSuccess) {
        reset(); // Reset only if successful
      }
    }
  };
  

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* First Select Input */}
          <FormControl isInvalid={!!errors.CSVRow} mb={4}>
            <FormLabel>CSV Row</FormLabel>
            <Controller
              name="CSVRow"
              control={control}
              rules={{ required: "Select a CSV row" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={options}
                  isClearable
                  placeholder={"Select a row"}
                  styles={customStyles}
                />
              )}
            />
            {errors.CSVRow && (
              <FormErrorMessage>{errors.CSVRow.message}</FormErrorMessage>
            )}
          </FormControl>

          {/* Second Select Input */}
          <FormControl isInvalid={!!errors.DataRow} mb={4}>
            <FormLabel>Data Type</FormLabel>
            <Controller
              name="DataRow"
              control={control}
              rules={{ required: "Select a data type" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={dataTypeOptions} // Assuming this is the options for the second select
                  isClearable
                  placeholder={"Select a data type"}
                  styles={customStyles}
                />
              )}
            />
            {errors.DataRow && (
              <FormErrorMessage>{errors.DataRow.message}</FormErrorMessage>
            )}
          </FormControl>
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
          <Button variant="ghost" onClick={handleSubmit(onSubmit)}>
            {primaryActionLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomDialogWithSelect;
