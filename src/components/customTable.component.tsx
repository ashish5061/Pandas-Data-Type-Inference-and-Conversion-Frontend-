// src/components/PostsTable.tsx
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import React from "react";

interface Post {
  id: number;
  title: string;
  category: string;
}

const CustomTable: React.FC<any> = ({ data }) => {
  return (
    <Table variant="simple" width="100%">
      <Thead>
        <Tr>
          {data?.data?.length > 0 &&
            Object.keys(data.data[0]).map((key) => <Th key={key}>{key}</Th>)}
        </Tr>
      </Thead>
      <Tbody>
        {/* {[].map((post) => (
          <Tr key={post.id}>
             <Td>{post.id}</Td>
            <Td>{post.title}</Td>
            <Td>{post.category}</Td>

            <Td>
              <IconButton
                aria-label="Edit post"
                icon={<EditIcon />}
                mr={2}
                _hover={{ bg: "blue.400", color: "white" }}
              />
              <IconButton
                aria-label="Delete post"
                icon={<DeleteIcon />}
                _hover={{ bg: "red.400", color: "white" }}
              />
            </Td>
          </Tr>
        ))} */}
        {data?.data?.map((row: any, index: number) => (
          <Tr key={index}>
            {Object.values(row).map((value: any, i) => (
              <Td key={i}>{value}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default CustomTable;
