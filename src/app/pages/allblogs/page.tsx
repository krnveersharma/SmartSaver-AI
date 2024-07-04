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
import Link from "next/link";
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
      const response = await fetch("/api/Blog", {
        method: "GET",
      });
      const allBlogs = await response.json();
      console.log(allBlogs);
      setData(allBlogs.data);
    };
    getBlogs();
  }, []);
  return (
    <Box>
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
                <Tr onClick={()=>{
                  router.push(`/pages/getblog?id=${item.id}` )
                }} cursor={'pointer'}>
                 
                    <Td>{item.title.substring(0, 24)}...</Td>
                    <Td>{item.Category.substring(0, 24)}...</Td>
                    <Td>{item.Description.substring(0, 24)}...</Td>
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
