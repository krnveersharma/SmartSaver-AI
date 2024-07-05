"use client";
import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Simple from "../../components/Navbar";

const YourBlogs = () => {
  const router = useRouter();

  const [data, setData] = useState([
    {
      id: "",
      title: "",
      Category: "",
      Description: "",
      userId: "",
    },
  ]);
  useEffect(() => {
    const getBlogs = async () => {
      const response = await fetch("/api/userblogs", {
        method: "GET",
      });
      const allBlogs = await response.json();
      setData(allBlogs.userblogs);
    };
    getBlogs();
  }, []);
  return (
    <Box className="px-2">
      <TableContainer>
        <Table variant={"simple"}>
          <Thead>
            <Tr>
              <Th isTruncated>Title</Th>
              <Th isTruncated>Category</Th>
              <Th isTruncated>Description</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => {
              return (
                <Tr>
                  <Td>{item.title.substring(0, 24)}...</Td>
                  <Td>{item.Category.substring(0, 24)}...</Td>
                  <Td>{item.Description.substring(0, 24)}...</Td>
                  <Td>
                    <Button
                      colorScheme={"blue"}
                      onClick={() => {
                        router.push(`/pages/editblog?id=${item.id}`);
                      }}
                    >
                      Edit
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      colorScheme={"red"}
                      onClick={async (e) => {
                        const response = await fetch("/api/userblogs", {
                          method: "DELETE",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(item.id),
                        });
                        const newData = await response.json();

                        setData(newData.data);
                      }}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <br />
      <br />
      <Button
        background={"black"}
        color={"white"}
        onClick={() => router.push("/pages/addblog")}
      >
        +Add Blog
      </Button>
    </Box>
  );
};

export default YourBlogs;
