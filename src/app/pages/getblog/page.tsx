"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Card, CardBody, CardHeader, Text } from "@chakra-ui/react";
import Simple from "../../components/Navbar";

const GetBlog = () => {
  
  const [data, setData] = useState({
    id: "",
    title: "",
    Category: "",
    Description: "",
    userId: "",
  });
  useEffect(() => {
    let params= new URLSearchParams(document.location.search);
  const id=params.get("id");
    const getBlogs = async () => {
      const response = await fetch("/api/getblogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      });
      const allBlogs = await response.json();
      setData(allBlogs.data[0]);
    };
    getBlogs();
  }, []);
  return (
    <Suspense>
      <Simple/>
      <Card p={"4"}>
        <CardHeader fontWeight={"bold"}>{data.title}</CardHeader>
        <CardBody>
          <Text>{data.Description}</Text>
        </CardBody>
      </Card>
    </Suspense>
  );
};

export default GetBlog;
