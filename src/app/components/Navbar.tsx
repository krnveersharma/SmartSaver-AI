"use client";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const Links = ["Home", "Team"];

const NavLink = (props: Props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPresent, setIsPresent] = useState(false);
  useEffect(() => {
    const userData = async () => {
      try {
        const response = await fetch("/api/getUser", {
          method: "GET",
        });
        if (response.ok) {
          setIsPresent(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    userData();
  }, []);
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/Logout", {
        method: "GET",
      });
      if (response.ok) {
        console.log("Logout successful");

        window.location.reload();
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack  spacing={8} alignItems={"center"}>
            <svg width="100" height="64"  xmlns="http://www.w3.org/2000/svg">
              <rect rx="100%"  width="100%" height="100%" fill="white" />

              <text x="10" y="35" font-family="Arial" font-size="20" fill="black">
                $
              </text>

              <text
                x="25"
                y="25"
                font-family="Arial"
                font-size="10"
                fill="black"
              >
                <tspan font-size="15" font-weight="italic">
                  M
                </tspan>
                oney
                <tspan fontStyle={'italic'} x="25" dy="1.2em" font-size="15">
                  M
                </tspan>
                <tspan fontStyle={'italic'}>anager</tspan>
              </text>
            </svg>

            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <Link href="/pages/home" key={"home"}>
                Home
              </Link>
              <Link href="/pages/yourblogs" key={"home"}>
                Your Blogs
              </Link>
              <Link href="/pages/allblogs" key={"allblogs"}>
                All Blogs
              </Link>
              <Link href="/pages/recommendations">Recommendations</Link>
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              {isPresent && (
                <Box>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                    onClick={(e) => {
                      e.preventDefault();

                      handleLogout();
                    }}
                  >
                    Logout
                  </MenuButton>
                </Box>
              )}
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Link href="/pages/home" key={"home"}>
                Home
              </Link>
              <Link href="/pages/yourblogs" key={"yourblogs"}>
                Your Blogs
              </Link>
              <Link href="/pages/allblogs" key={"allblogs"}>
                All Blogs
              </Link>
              <Link href="/pages/recommendations">Recommendations</Link>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
