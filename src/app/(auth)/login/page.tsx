'use client'
import { Button, Card, CardBody, CardHeader, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { redirect } from "react-router-dom";

const Login = () => {
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
              redirect('/Pages/home')
              
            }
            else{
              console.log("Error");
            }
        } catch (error) {
            console.log(error);
        }
       
    }
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
        </CardBody>
        <Button type="submit" colorScheme={'green'}>Submit</Button>
      </Card>
    </form>
  );
};

export default Login;
