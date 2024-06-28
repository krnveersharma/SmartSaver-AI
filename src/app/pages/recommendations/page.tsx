'use client'
import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const Recommendations = () => {
    const [data,setData]=useState("");
    useEffect(()=>{
        const getRecommendations=async()=>{
            const response=await fetch('/api/recommendations',{
                method:"GET"
            })
            const data=await response.json();
            console.log("data",data)
            setData(data.message);
        }
        getRecommendations();
    },[])
    useEffect(()=>{
        const d=[];
        let temp="";
        // for(let i=0;i<data.length;i++){
        //     if(!isNaN(data[i]))
        // }
    },[data]);
  return (
    <Card>
        <CardHeader>
            <Heading>Recommendations</Heading>
        </CardHeader>
        <CardBody>
                {data}
        </CardBody>
    </Card>
  )
}

export default Recommendations