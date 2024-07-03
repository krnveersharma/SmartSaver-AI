"use client";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../../components/InfiniteMovingCards";
import Head from "next/head";
import Simple from "../../components/Navbar";

const Recommendations = () => {
  const [data, setData] = useState<{ any: any }[]>([]);

  useEffect(() => {
    const getRecommendations = async () => {
      const response = await fetch("/api/recommendations", {
        method: "GET",
      });
      const data = await response.json();
      try {
        const cleanString = data.message.trim();
        const array = JSON.parse(cleanString);
        setData(array);
      } catch (error) {
        console.log(error);
      }
    };
    getRecommendations();
  }, []);
  useEffect(() => {
    console.log("data", data);
  }, [data]);

  return (
    <>
      <Simple />
      <Card>
        <CardHeader>
          <Heading>Recommendations</Heading>
        </CardHeader>
        <CardBody>
          <InfiniteMovingCards items={data} />
        </CardBody>
      </Card>
    </>
  );
};

export default Recommendations;
