"use client";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditBlog = () => {
  const router = useRouter();

  const [data, setData] = useState({
    id: "",
    title: "",
    Category: "",
    Description: "",
    userId: "",
  });
  useEffect(() => {
    let params = new URLSearchParams(document.location.search);
    const id = params.get("id");

    const getBlog = async () => {
      const response = await fetch("/api/editblog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id}),
      });
      const dt = await response.json();
    
      setData(dt.data);
    };
    getBlog();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/editblog", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setData({
      id: "",
      title: "",
      Category: "",
      Description: "",
      userId: "",
    });
    router.push("/pages/yourblogs");
  };
  return (
    <>
      <Card>
        <CardHeader>
          <Heading>Add Your Blog!!!</Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel fontSize={"large"} fontWeight={"bold"}>
                Title
              </FormLabel>
              <Textarea
                maxLength={480}
                value={data.title}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }));
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"large"} fontWeight={"bold"}>
                Category
              </FormLabel>
              <Textarea
                maxLength={20}
                value={data.Category}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    Category: e.target.value,
                  }));
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"large"} fontWeight={"bold"}>
                Description
              </FormLabel>
              <Textarea
                value={data.Description}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    Description: e.target.value,
                  }));
                }}
              />
            </FormControl>
            <br />
            <Button float={"right"} colorScheme={"blue"} type="submit">
              Submit
            </Button>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default EditBlog;
