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
  const [url, setUrl] = useState("/pages/home");
  useEffect(() => {
    const userData = async () => {
      try {
        const response = await fetch("/api/getUser", {
          method: "GET",
        });
        const parsedData = await response.json();
        if (parsedData.status === 200) {
          setIsPresent(true);
        } else {
          setIsPresent(false);
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
      <Box backgroundColor={"#36454F"} textColor={"white"} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <svg width="100" height="64" xmlns="http://www.w3.org/2000/svg">
              <rect rx="100%" width="100%" height="100%" fill="white" />

              <text
                x="10"
                y="35"
                font-family="Arial"
                font-size="20"
                fill="black"
              >
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
                <tspan fontStyle={"italic"} x="25" dy="1.2em" font-size="15">
                  M
                </tspan>
                <tspan fontStyle={"italic"}>anager</tspan>
              </text>
            </svg>

            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
              h={16}
            >
              <Link
                href="/pages/home"
                key={"home"}
                onClick={() => setUrl("/pages/home")}
              >
                <Box
                  className={
                    url === "/pages/home"
                      ? " border-b-2 border-b-white-500"
                      : "flex items-center justify-center"
                  }
                >
                  Home
                </Box>
              </Link>
              <Link
                href="/pages/yourblogs"
                key={"home"}
                onClick={() => setUrl("/pages/yourblogs")}
              >
                <Box
                  className={
                    url === "/pages/yourblogs"
                      ? " border-b-2 border-b-white-500"
                      : ""
                  }
                >
                  Your Blogs
                </Box>
              </Link>

              <Link
                href="/pages/allblogs"
                key={"allblogs"}
                onClick={() => setUrl("/pages/allblogs")}
              >
                <Box
                  className={
                    url === "/pages/allblogs"
                      ? " border-b-2 border-b-white-500"
                      : ""
                  }
                >
                  All Blogs
                </Box>
              </Link>
              <Link
                href="/pages/recommendations"
                onClick={() => setUrl("/pages/recommendations")}
              >
                <Box
                  className={
                    url === "/pages/recommendations"
                      ? " border-b-2 border-b-white-500"
                      : ""
                  }
                >
                  Recommendations
                </Box>
              </Link>
              <Link
                href="/pages/ExpenditureControl"
                onClick={() => setUrl("/pages/ExpenditureControl")}
              >
                <Box
                  className={
                    url === "/pages/ExpenditureControl"
                      ? " border-b-2 border-b-white-500"
                      : ""
                  }
                >
                  ExpenditureControl
                </Box>
              </Link>
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
              <Link
                href="/pages/home"
                key={"home"}
                onClick={() => setUrl("/pages/home")}
              >
                <Box
                  width={"max-content"}
                  className={
                    url === "/pages/home"
                      ? " border-b-2 border-b-white-500"
                      : ""
                  }
                >
                  Home
                </Box>
              </Link>
              <Link
                href="/pages/yourblogs"
                key={"home"}
                onClick={() => setUrl("/pages/yourblogs")}
              >
                <Box
                  width={"max-content"}
                  className={
                    url === "/pages/yourblogs"
                      ? " border-b-2 border-b-white-500"
                      : ""
                  }
                >
                  Your Blogs
                </Box>
              </Link>

              <Link
                href="/pages/allblogs"
                key={"allblogs"}
                onClick={() => setUrl("/pages/allblogs")}
              >
                <Box
                  width={"max-content"}
                  className={
                    url === "/pages/allblogs"
                      ? " border-b-2 border-b-white-500"
                      : ""
                  }
                >
                  All Blogs
                </Box>
              </Link>
              <Link
                href="/pages/recommendations"
                onClick={() => setUrl("/pages/recommendations")}
              >
                <Box
                  width={"max-content"}
                  className={
                    url === "/pages/recommendations"
                      ? " border-b-2 border-b-white-500"
                      : ""
                  }
                >
                  Recommendations
                </Box>
              </Link>
              <Link
                href="/pages/ExpenditureControl"
                onClick={() => setUrl("/pages/ExpenditureControl")}
              >
                <Box
                  width={"max-content"}
                  className={
                    url === "/pages/ExpenditureControl"
                      ? " border-b-2 border-b-white-500"
                      : ""
                  }
                >
                  ExpenditureControl
                </Box>
              </Link>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
