'use client'
import { Box, Button, Card, CardBody, CardHeader, Flex, FormControl, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { MultiStepLoader as Loader } from "./components/ui/multi-step-loader";
const Login = () => {
  const router = useRouter()

    const [data,setData]=useState({
        username:'',
        password:''
    })
    const [loading, setLoading] = useState(false);

  const loadingStates = [
    {
      text: "Getting your credentials",
    },
    {
      text: "Loading your data",
    },
    {
      text: "Please wait",
    },
  ];

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true)
      try {
        const response = await fetch('/api/Login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const parsedData=await response.json();
        if (parsedData.status===200) {
          window.location.assign('/pages/home')
        } else {
          console.log('Login failed:', parsedData.status);
        }
        setLoading(false);
      } catch (error) {
        console.log('Error during login:', error);
        setLoading(false);
      }
    };
    useEffect(()=>{
      const getting=async()=>{
        try {
          const response = await fetch("/api/getUser", {
            method: "GET",
          });
          const data=await response.json();
          if (data.status===200) {
            router.push('/pages/home');
          }
          else{
          }
        } catch (error) {
        }
        
    }
    getting();

    },[])
  return (
    <Flex height={'100vh'}  alignItems={'center'} justifyContent={'center'}>
    <form onSubmit={handleSubmit}>
       <Loader loadingStates={loadingStates} loading={loading} duration={2000} />
      <Card align="center" border={'none'} shadow={'none'}>
        <CardHeader>
          <Heading>Welcome!</Heading>
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
        <span><Link href="/register"><Text align={'left'} fontSize={'sm'} className=" text-blue-500">Create account</Text></Link></span></Box>
        </CardBody>
        
        <Button type="submit" backgroundColor={'black'}  color={'white'} >Login</Button>
      </Card>
    </form>
    </Flex>
  );
};

export default Login;
