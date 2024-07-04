"use client";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormLabel,
  Heading,
  List,
  ListItem,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SendHorizontal } from "lucide-react";
import Simple from "../../components/Navbar";

const Recommendations = () => {
  const [data, setData] = useState<{ any: any }[]>([]);
  const [inp, setInp] = useState("");

  useEffect(() => {
    const getRecommendations = async () => {
      const response = await fetch("/api/recommendations", {
        method: "GET",
      });
      const data = await response.json();
      try {
        const cleanString = data.message.trim();
        let first = -1;
        let last = -1;
        for (let i = 0; i < cleanString.length; i++) {
          if (cleanString[i] == "[") {
            first = i;
          }
          if (cleanString[i] == "]") {
            last = i;
          }
        }
        console.log(cleanString.substring(first, last + 1));
        const array = JSON.parse(cleanString.substr(first, last + 1));
        setData(array);
      } catch (error) {
        console.log(error);
      }
    };
    getRecommendations();
  }, []);

  return (
    <>
      <Card height={"100%"}>
        <Heading>Recommendations</Heading>
        <Text fontSize={"sm"} fontStyle={"italic"}>
          (Based on last 6 days)
        </Text>
        <CardBody>
          {data.map((item, idx) =>
            Object.entries(item).map(([key, value]) => (
              <List key={`${idx}-${key}`}>
                <ListItem>
                  <Text fontWeight={"bold"}>{key}</Text>
                  <Text> {value}</Text>
                </ListItem>
                <br />
                <br />
              </List>
            ))
          )}
          <Box position={"sticky"} bottom={0} className=" bg-slate-100 z-10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const getRecommendations = async () => {
                  const response = await fetch("/api/recommendations", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(inp),
                  });
                  const data = await response.json();
                  try {
                    const cleanString = data.message.trim();
                    let first = -1;
                    let last = -1;
                    for (let i = 0; i < cleanString.length; i++) {
                      if (cleanString[i] == "[") {
                        first = i;
                      }
                      if (cleanString[i] == "]") {
                        last = i;
                      }
                    }
                    console.log(cleanString.substr(first, last + 1));
                    const array = JSON.parse(
                      cleanString.substring(first, last + 1)
                    );

                    console.log("yourdata", array);
                    setData(array);
                  } catch (error) {
                    console.log(error);
                  }
                };
                getRecommendations();
                setInp("");
              }}
            >
              <Flex
                alignItems={"center"}
                className={"border border-gray-200 rounded-md"}
              >
                <Textarea
                  resize={"none"}
                  _focusVisible={{
                    outline: "none",
                  }}
                  border={"0px"}
                  value={inp}
                  onChange={(e) => {
                    setInp(e.target.value);
                  }}
                  placeholder="Enter doubts to get customized recommendation!!"
                />

                <Button type="submit" className="bg-slate-100">
                  <SendHorizontal />
                </Button>
              </Flex>
            </form>
          </Box>
        </CardBody>
      </Card>
    </>
  );
};

export default Recommendations;
