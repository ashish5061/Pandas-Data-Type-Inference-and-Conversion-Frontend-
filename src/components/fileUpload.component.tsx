import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
} from "@chakra-ui/react";

interface FileUploadComponentProps {
  handleImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUploadComponent: React.FC<FileUploadComponentProps> = ({
  handleImport
}) => {
  return (
    <>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={4}
        border="2px dashed #CBD5E0"
        borderRadius="md"
        p={6}
        w={{ base: "100%", md: "100%" }}
        mx="auto"
        mt={10}
      >
        <Box textAlign="center">
          <Text>Select and upload the files of your choice</Text>
        </Box>

        <Box textAlign="center">
          <Input
            type="file"
            onChange={handleImport}
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            id="inputGroupFile"
            required
            display="none"
          />
          <label htmlFor="inputGroupFile">
            <Button as="span" variant="outline" size="lg" cursor="pointer">
              Browse File
            </Button>
          </label>
          <Text mt={2} fontSize="sm" color="gray.500">
            CSV or Excel files, up to 5MB
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default FileUploadComponent;
