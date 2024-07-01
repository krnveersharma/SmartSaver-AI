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
    <Box>
      <Text fontWeight={'bold'}>Recommendations</Text>
      <InfiniteMovingCards items={data}/>
    
    </Box>
  );
};

export default Recommendations;

