import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Spinner,
  Text,
} from "@chakra-ui/react";
import api from "../api";
import { useToast } from "@chakra-ui/react";
import FileUploadDialog from "../components/form/fileUploadDialog.component";
import CustomDialogWithSelect from "../components/form/customDialogWithSelect";
import { FiUploadCloud } from "react-icons/fi";
import Pagination from "../components/pagination";

interface Data {
  data: Record<string, any>[]; // Array of records (key-value pairs)
  data_types: { [key: string]: string }; // Object with column names as keys and data types as values
}

interface Option {
  value: string;
  label: string;
}

const HomeComponent: React.FC = () => {
  const toast = useToast();
  const [data, setData] = useState<Data>({
    data: [],
    data_types: {},
  });
  const [error, setError] = useState("");
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isOverRideDataTypesDialogOpen, setIsOverRideDataTypesDialogOpe] =
    useState(false);
  const [rowsOption, setRowsOption] = useState<Option[]>([]);
  const [filePath, setFilePath] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const onOpenImportDialog = () => setIsImportDialogOpen(true);
  const onCloseImportDialog = () => setIsImportDialogOpen(false);

  const onOpenOverRideDataTypesDialog = () =>
    setIsOverRideDataTypesDialogOpe(true);
  const onCloseOverRideDataTypesDialog = () =>
    setIsOverRideDataTypesDialogOpe(false);

  const handlePrimaryAction = async (data: any): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await api.post("/api/override", {
        column: data.CSVRow.value,
        dataType: data.DataRow.value,
        filePath: filePath,
      });
  
      // Success handling
      toast({
        title: "File uploaded.",
        description: "Data Types have been overridden.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      
      setFilePath(response.data.file_path); // Update file path
      setData(response.data); // Assuming the backend returns the processed data
      onCloseOverRideDataTypesDialog(); // Close the dialog
      return true; // Indicate success
    } catch (error) {
      // Error handling
      toast({
        title: "Something went wrong",
        description: "There was an issue creating your account. Please try again.",
        status: "error",
        duration: 3000, // Auto close after 3 seconds
        isClosable: true,
      });
      
      return false; // Indicate failure
    } finally {
      setLoading(false); // Ensure loading is set to false in both success and error cases
    }
  };
  

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const files = event.target.files;
    if (files && files.length) {
      const file = files[0];
      const allowedExtensions = /(\.csv|\.xlsx)$/i;

      if (!allowedExtensions.exec(file.name)) {
        setError("Please upload a file in CSV or Excel format.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File size should not exceed 5 MB.",
          description:
            "There was an issue creating your account. Please try again.",
          status: "error",
          duration: 3000, // Auto close after 6 seconds
          isClosable: true,
        });
        return;
      }

      const formData = new FormData();
      formData.append("file", file); // Append the file to the FormData

      try {
        const response = await api.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        });

        setLoading(false);
        onCloseImportDialog();
        setFilePath(response.data.file_path);
        // Assuming the backend returns the processed data
        setData(response.data);
        const rowOptions = Object.keys(response.data.data_types).map(
          (key) => ({
            value: key,
            label: `${key}`, // Creating a label with the name and type
          })
        );

        setRowsOption(rowOptions);
        toast({
          title: "File uploaded.",
          description: "We've uploaded a file for you.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error: any) {
        setLoading(false);
        toast({
          title: "An error occurred.",
          description:
            "There was an issue creating your account. Please try again.",
          status: "error",
          duration: 3000, // Auto close after 6 seconds
          isClosable: true,
        });
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || "File upload failed");
        } else {
          setError("An unexpected error occurred");
        }
      }
    }
  };

  return (
    <>
      <Box p={5} mx="auto" width="100%">
        {loading && (
          <Box
            position="fixed"
            bottom="20px"
            left="20px"
            display="flex"
            alignItems="center"
          >
            <Spinner
              size="md"
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
            />
            <Text
              ml={3}
              fontSize="lg"
              fontWeight="bold"
              color="blue.600"
              fontFamily="sans-serif"
            >
              Importing data, please wait...
            </Text>
          </Box>
        )}

        
        <Flex justify="space-between" mb={5} width="100%">
          <Heading as="h1" size="lg" p={5}>
            CSV/Excel
          </Heading>
          <Box>
            <Button colorScheme="green" mr={2} onClick={onOpenImportDialog}>
              Upload
            </Button>
            <Button
              colorScheme="blue"
              mr={2}
              onClick={onOpenOverRideDataTypesDialog}
              isDisabled={data.data.length == 0}
            >
              Override Data Types
            </Button>
          </Box>
        </Flex>
      </Box>
      <FileUploadDialog
        isOpen={isImportDialogOpen}
        onClose={onCloseImportDialog}
        title="Upload files"
        primaryActionLabel="Upload"
        handleImport={handleImport}
      />
      <CustomDialogWithSelect
        isOpen={isOverRideDataTypesDialogOpen}
        onClose={onCloseOverRideDataTypesDialog}
        title="Override Data Types"
        primaryActionLabel="Sumbit"
        onPrimaryAction={handlePrimaryAction}
        options={rowsOption}
      />
      {data.data.length > 0 ? (
          <Pagination data={data} />
        ) : (
          <Flex
            direction="column"
            justify="center"
            align="center"
            mt={6}
            color="gray.600"
          >
            <Icon as={FiUploadCloud} w={20} h={20} mb={4} color="gray.400" />
            <Text fontSize="2xl" fontWeight="bold" mb={2} textAlign="center">
              No Data Available
            </Text>
            <Text fontSize="lg" color="gray.600" textAlign="center" mb={4}>
              We currently have no data to display in this section.
            </Text>
            <Text fontSize="lg" color="gray.500" textAlign="center">
              To proceed, please upload the necessary data.
            </Text>
          </Flex>
        )}
    </>
  );
};

export default HomeComponent;
