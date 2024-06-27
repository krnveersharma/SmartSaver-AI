"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Box, Card, CardBody, CardHeader, Text } from "@chakra-ui/react";

const GetBlog = () => {
  const id = new URLSearchParams("id");
  const [data, setData] = useState({
    id: "",
    title: "",
    Category: "",
    Description: "",
    userId: "",
  });
  useEffect(() => {
    const getBlogs = async () => {
      const response = await fetch("/api/getblogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      });
      const allBlogs = await response.json();
      console.log(allBlogs);
      setData(allBlogs.data[0]);
    };
    getBlogs();
  }, []);
  return (
    <Suspense>
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
