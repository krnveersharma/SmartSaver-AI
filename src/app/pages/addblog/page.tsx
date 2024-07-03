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
  Text,
  Textarea,
  useStatStyles,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Simple from "../../components/Navbar";

const AddBlog = () => {
  const router = useRouter();
  const [data, setData] = useState({
    title: "",
    category: "",
    description: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/Blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setData({
      title: "",
      category: "",
      description: "",
    });
    router.push("/pages/yourblogs");
  };
  return (
    <>
      <Simple />
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
                value={data.category}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }));
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={"large"} fontWeight={"bold"}>
                Description
              </FormLabel>
              <Textarea
                value={data.description}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    description: e.target.value,
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

export default AddBlog;
