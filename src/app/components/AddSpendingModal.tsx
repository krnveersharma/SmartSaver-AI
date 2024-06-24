'use client'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
  } from '@chakra-ui/react'
import React, { useState } from 'react'
export default function AddSpendingModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = React.useRef(null)
    const [val,setVal]=useState({
      expense:'',
      name:''
    });
    const handleSubmit=async(e)=>{
        await fetch('/api/AddExpense',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify(val)
        })
        e.preventDefault();
        setVal({
          expense:'',
          name:''
        });
    }
    return (
      <>
  
        <Button colorScheme={'blue'} mt={4} onClick={onOpen}>
          +Add Spending
        </Button>
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <form onSubmit={handleSubmit}>
            <ModalHeader>Add Spending</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <FormControl>
                    <FormLabel>Add Spend</FormLabel>
                    <Input type='number' value={val.expense} onChange={(e)=>{
                        setVal((prev)=>({
                          ...prev,
                          expense:e.target.value
                        }))
                    }}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Add Spending Name</FormLabel>
                    <Input type='text' value={val.name} onChange={(e)=>{
                        setVal((prev)=>({
                          ...prev,
                          name:e.target.value
                        }))
                    }}/>
                </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button type='submit' >Submit</Button>
            </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </>
    )
  }