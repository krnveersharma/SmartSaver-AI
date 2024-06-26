'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Box, Card, CardBody, CardHeader, Text } from '@chakra-ui/react';

const GetBlog = () => {
    const searchParams=useSearchParams();
    const id=searchParams.get('id');
    const [data,setData]=useState({
        id: "",
        title: "",
        Category: "",
        Description: "",
        userId: "",
    })
    useEffect(() => {
      const getBlogs = async () => {
        const response = await fetch("/api/getblogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(id),
        })
        const allBlogs = await response.json();
        console.log(allBlogs);
        setData(allBlogs.data[0]);
      };
      getBlogs();
    }, []);
  return (
    <Card p={'4'}>
      <CardHeader fontWeight={'bold'}>{data.title}</CardHeader>
      <CardBody>
        <Text>{data.Description}</Text>
      </CardBody>
    </Card>
  )
}

export default GetBlog