"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Select, Stack, Text } from "@chakra-ui/react";
import AddSpendingModal from "../../components/AddSpendingModal";
import AllTime from "../../components/AllTime";
import Daily from "../../components/Daily";
import Monthly from "../../components/Monthly";

type Expenditure = {
  id: string;
  expense: number;
  date: Date;
  name: string;
  userId: string;
};
type UserData = {
  id: String;
  username: string;
  email: string;
  phone: string;
  password: string;
  Income: number;
  iat: number;
  exp: number;
  expenditure: [Expenditure];
};

const Home = () => {
  const [option, setOption] = useState(<AllTime />);
  const [data, setData] = useState<UserData>({
    id: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    Income: 0,
    iat: 0,
    exp: 0,
    expenditure: [
      {
        id: "loading",
        expense: 0,
        date: new Date(),
        userId: "0",
        name: "loading",
      },
    ],
  });
  useEffect(() => {
    const userData = async () => {
      try {
        const response = await fetch("/api/getUser", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const val = await response.json();
        setData(val.message[0]);
      } catch (error) {
        console.log(error);
      }
    };
    userData();
  }, []);

  return (
    <Box>
      <Box>
      </Box>
      <Box p={4}>
        <Text fontSize={"xl"} fontWeight={"semibold"}>
          Hey, <span style={{ color: "red" }}>{data.username}</span> See your
          Spendings till now
        </Text>
        <AddSpendingModal/>
        <br/><br/>
        <Select
          width={'max-content'}
          onChange={(e) => {
            if ((e.target.value === "0")) {
              setOption(<AllTime />);
            } else if (e.target.value === "1") {
              setOption(<Daily />);
            }
             else if (e.target.value === "2") {
              setOption(<Monthly />);
            }
          }}
        >
          <option value="0">All Time</option>
          <option value="1">Daily</option>
          <option value="2">Monthly</option>
        </Select>
        
      </Box>
      {option}
    </Box>
  );
};
//yjfghjk

export default Home;
