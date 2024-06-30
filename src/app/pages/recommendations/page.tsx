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

const Recommendations = () => {
  const [data, setData] = useState([{ loading: "Loading" }]);
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
    <Card>
      <CardHeader>
        <Heading>Recommendations</Heading>
      </CardHeader>
      <CardBody>
        {data.map((item, index) => (
          <Box key={index} mb={4}>
            {Object.entries(item).map(([key, value]) => (
              <Box key={key}>
                <Text fontWeight="bold">{key}:</Text>
                <Text>{value}</Text>
              </Box>
            ))}
          </Box>
        ))}
      </CardBody>
    </Card>
  );
};

export default Recommendations;
