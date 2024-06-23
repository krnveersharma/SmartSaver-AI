'use client'
import { Box, Button, Card, CardBody, CardHeader, FormControl, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { redirect } from "react-router-dom";
import { useRouter } from 'next/navigation'

const Login = () => {
  const router = useRouter()

    const [data,setData]=useState({
        username:'',
        password:''
    })
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const response=await fetch('/api/Login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                  },
                  body:JSON.stringify(data)
            })
            if(response.ok){
              router.push('/pages/home')
              
            }
            else{
              console.log("Error");
            }
        } catch (error) {
            console.log(error);
        }
       
    }
    useEffect(()=>{
      const getting=async()=>{
        const response = await fetch("/api/getUser", {
          method: "GET",
        });
        console.log(response)
        if (response.ok) {
          router.push('/pages/home')
        }
    }
    getting();
    },[])
  return (
    <form onSubmit={handleSubmit}>
      <Card align="center">
        <CardHeader>
          <Heading>Login</Heading>
        </CardHeader>
        <CardBody>
            <FormControl>
                <FormLabel>Username</FormLabel>
                <Input type="text" value={data.username} onChange={(e:any)=>{
                    setData((prev)=>({
                        ...prev,
                        username:e.target.value
                    }))
                }}/>
            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={data.password} onChange={(e:any)=>{
                    setData((prev)=>({
                        ...prev,
                        password:e.target.value
                    }))
                }}/>
            </FormControl>    
            <Box width={'inherit'}>
              <span><Text fontSize={'sm'}>Not have an account?</Text></span>
        <span><Link href="/register"><Text align={'left'} fontSize={'sm'}>Create account</Text></Link></span></Box>
        </CardBody>
        
        <Button type="submit" colorScheme={'green'}>Submit</Button>
      </Card>
    </form>
  );
};

export default Login;
