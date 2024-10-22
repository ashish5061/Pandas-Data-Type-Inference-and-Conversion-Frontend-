import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Text,
  Table,
  Thead,
  Tr,
  Tbody,
  Td,
  Th,
  Select,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { dataTypeMapper } from "../constants/constants";

// Define the type for the data prop
interface PaginationProps {
  data: any; // Update this type according to your data structure
}

const Pagination: React.FC<PaginationProps> = ({ data }) => {
  const mappedData = data.data;
  // State variables for pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 8; // Number of items per page

  // Calculate the total number of pages
  const totalPages: number = Math.ceil(mappedData.length / itemsPerPage);

  // Calculate the start and end indices for the current page
  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;

  // Get the current items for the page
  const currentItems: any = mappedData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page function
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Render pagination controls (buttons)
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <Button
            key={i}
            onClick={() => handlePageChange(i)}
            colorScheme={currentPage === i ? "blue" : "gray"}
            size="sm"
            variant={currentPage === i ? "solid" : "outline"}
            borderRadius="md"
            mx={1} // Margin on the x-axis between page number buttons
          >
            {i}
          </Button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(
          <Text key={`ellipsis-${i}`} mx={2}>
            ...
          </Text>
        );
      }
    }
    return pages;
  };

  return (
    <Box p={4} borderRadius="md" boxShadow="lg" bg="white">
      <Table variant="striped" width="100%">
        <Thead>
          <Tr>
            {/* Serial Number Header */}
            <Th textAlign="center" fontWeight="bold">
              SN
            </Th>
            {data?.data?.length > 0 &&
              Object.keys(data.data[0]).map((key) => (
                <Th key={key} textAlign="center" fontWeight="bold">
                  {key} (
                  {dataTypeMapper[data.data_types[key]]
                    ? dataTypeMapper[data.data_types[key]]
                    : data.data_types[key]}
                  )
                </Th>
              ))}
          </Tr>
        </Thead>
        <Tbody>
          {currentItems?.map((row: any, index: number) => (
            <Tr key={index}>
              {/* Render Serial Number */}
              <Td textAlign="center">{indexOfFirstItem + index + 1}</Td>
              {Object.values(row).map((value: any, i) => (
                <Td key={i} textAlign="center">
                  {value}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Divider my={4} />

      {/* Pagination Controls */}
      <Flex justify="space-between" align="center" mt={4} wrap="wrap">
        {/* Controls Container */}
        <Flex align="center">
          <Button
            onClick={() => handlePageChange(1)}
            isDisabled={currentPage === 1}
            colorScheme="blue"
            size="sm"
            mx={1} // Margin between buttons
            p={2} // Padding inside buttons
          >
            First
          </Button>

          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            isDisabled={currentPage === 1}
            colorScheme="blue"
            size="sm"
            mx={1} // Margin between buttons
            p={2} // Padding inside buttons
          >
            Previous
          </Button>

          <Stack direction="row" spacing={0}>
            {renderPagination()}
          </Stack>

          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            isDisabled={currentPage === totalPages}
            colorScheme="blue"
            size="sm"
            mx={1} // Margin between buttons
            p={2} // Padding inside buttons
          >
            Next
          </Button>

          <Button
            onClick={() => handlePageChange(totalPages)}
            isDisabled={currentPage === totalPages}
            colorScheme="blue"
            size="sm"
            mx={1} // Margin between buttons
            p={2} // Padding inside buttons
          >
            Last
          </Button>

          {/* Dropdown for page selection */}
          <Select
            size="sm"
            value={currentPage}
            onChange={(e) => handlePageChange(Number(e.target.value))}
            width="auto"
            mx={1} // Margin to separate from buttons
          >
            {Array.from({ length: totalPages }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                Page {i + 1}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Pagination;
