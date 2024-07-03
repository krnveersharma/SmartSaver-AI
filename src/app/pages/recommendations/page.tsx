"use client";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormLabel,
  Heading,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../../components/InfiniteMovingCards";
import Head from "next/head";
import Simple from "../../components/Navbar";

const Recommendations = () => {
  const [data, setData] = useState<{ any: any }[]>([]);
  const [inp,setInp]=useState("");

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


  return (
    <>
      <Simple />
      <Card>
        <CardHeader>
          <form onSubmit={(e)=>{
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
                const array = JSON.parse(cleanString);
                console.log("yourdata",array)
                setData(array);
              } catch (error) {
                console.log(error);
              }
            };
            getRecommendations();
            setInp("");
          }}>
            <Textarea value={inp} onChange={(e)=>{
              setInp(e.target.value)
            }}/>
            <FormLabel>Enter chnages you want to make to recommendation!!!</FormLabel>
            <Button type="submit" colorScheme={'blue'}>Submit</Button>
          </form>
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
