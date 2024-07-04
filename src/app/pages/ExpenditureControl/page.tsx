"use client";
import { Text, Box, Input, Flex, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IndianRupee, SendHorizontal } from "lucide-react";

const ExpenditureControl = () => {
  const [data, setData] = useState({
    username: "",
    Income: 0,
  });

  useEffect(() => {
    const userData = async () => {
      try {
        const response = await fetch("/api/getUser", {
          method: "GET",
        });
        const parsedData = await response.json();
        console.log("parsed", parsedData.message[0]);
        if (parsedData.status === 200) {
          setData(parsedData.message[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    userData();
  }, []);
  return (
    <Box p={4}>
      <Text fontSize={"large"}>
        Hello{" "}
        <span className="text-red-700 font-semibold">{data.username}</span>,
        Please enter your target expenditure and get personalized expenditure
        plan
      </Text>
      <Flex
        width={"150px"}
        className="border border-gray-200 rounded-md"
        alignItems={"center"}
      >
        <IndianRupee />
        <Input
          _focusVisible={{
            outline: "none",
          }}
          border={"none"}
          type="number"
        />
        <Button backgroundColor={'inherit'} type="submit" className="bg-slate-100">
          <SendHorizontal />
        </Button>
      </Flex>
    </Box>
  );
};

export default ExpenditureControl;
