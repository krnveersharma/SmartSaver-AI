'use client'
import {
  Box,
    Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import { redirect } from "react-router-dom";


const Register = () => {
  const router = useRouter()

    const [data,setData]=useState({
        username:'',
        email:'',
        phone:'',
        password:'',
        income:''
    })
    const handleSubmit=async(e)=>{
      e.preventDefault();
      try {
        const response= await fetch('/api/Register',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(data)
        });
        if(response.ok){
          redirect('/login')
        }
        else{
          console.log("Error");
        }
      } catch (error) {
        console.log(Error);
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
      <Card align='center'>
        <CardHeader>
          <Heading>Register</Heading>
        </CardHeader>
        <CardBody>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input type="text" value={data.username} onChange={(e:any)=>{
              setData((prev)=>({
                ...prev,
                username:e.target.value
              }))
            }} />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={data.email} onChange={(e:any)=>{
              setData((prev)=>({
                ...prev,
                email:e.target.value
              }))
            }}/>
          </FormControl>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input type="number" value={data.phone} onChange={(e:any)=>{
              setData((prev)=>({
                ...prev,
                phone:e.target.value
              }))
            }} />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={data.password} onChange={(e:any)=>{
              setData((prev)=>({
                ...prev,
                password:e.target.value
              }))
            }} />
          </FormControl>
          <FormControl>
            <FormLabel>Income</FormLabel>
            <Input type="Number" value={data.income} onChange={(e:any)=>{
              setData((prev)=>({
                ...prev,
                income:e.target.value
              }))
            }} />
          </FormControl>
          <Box width={'inherit'}>
              <span><Text fontSize={'sm'}>Already have an account?</Text></span>
        <span><Link href="/"><Text align={'left'} fontSize={'sm'}>Login</Text></Link></span></Box>
        </CardBody>
        <Button type="submit" colorScheme={'green'}>Submit</Button>
      </Card>
    </form>
  );
};

export default Register;
