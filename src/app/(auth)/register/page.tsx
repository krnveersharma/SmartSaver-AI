'use client'
import {
    Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { redirect } from "react-router-dom";


const Register = () => {
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
        </CardBody>
        <Button type="submit" colorScheme={'green'}>Submit</Button>
      </Card>
    </form>
  );
};

export default Register;
