"use client";
import { Text, Box, Input, Flex, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IndianRupee, SendHorizontal } from "lucide-react";
import { MultiStepLoader as Loader } from "../../components/ui/multi-step-loader";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

const ExpenditureControl = () => {
  const [data, setData] = useState({
    username: "",
    Income: 0,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState("0");
  const [pieData, setPieData] = useState({
    labels: ["Loading"],
    datasets: [
      {
        data: [100],
        backgroundColor: ["rgba(75, 192, 192, 0.6)"],
      },
    ],
  });

  const loadingStates = [
    {
      text: "Fetching your expenditure",
    },
    {
      text: "Loading your request",
    },
    {
      text: "Please wait",
    },
  ];

  useEffect(() => {
    const userData = async () => {
      try {
        const response = await fetch("/api/getUser", {
          method: "GET",
        });
        const parsedData = await response.json();
        if (parsedData.status === 200) {
          setData(parsedData.message[0]);
        }
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    };
    userData();
  }, []);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/api/ExpenditureControl", {
          method: "GET",
        });
        const data = await response.json();
        console.log("data", data.data);
        const newdata = JSON.parse(data.data.data);
        setSaving(data.data.saving);
        const labels = [];
        const values = [];

        newdata.forEach((item) => {
          const key = Object.keys(item)[0];
          const value = item[key];
          labels.push(key);
          values.push(value);
        });

        setPieData({
          labels,
          datasets: [
            {
              data: values,
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
                "rgba(99, 255, 132, 0.6)",
                "rgba(235, 54, 162, 0.6)",
              ],
            },
          ],
        });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [data]);

  return (
    <Box p={4}>
      <Loader loadingStates={loadingStates} loading={loading} duration={2000} />

      <Text fontSize={"large"}>
        Hello{" "}
        <span className="text-red-700 font-semibold">{data.username}</span>,
        Please enter your target expenditure and get personalized expenditure
        plan
      </Text>
      <Flex
        width={"150px"}
        className="border border-gray-200 rounded-md"
        alignItems={"center"}
      >
        <IndianRupee />
        <Input
          _focusVisible={{
            outline: "none",
          }}
          value={saving}
          border={"none"}
          type="number"
          onChange={(e) => {
            setSaving(e.target.value);
          }}
        />
        <Button
          backgroundColor={"inherit"}
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setLoading(true);
            const SubmitForm = async () => {
              try {
                const response = await fetch("/api/ExpenditureControl", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(saving),
                });
                const data = await response.json();
                console.log(data);
                const newdata = JSON.parse(data.data);

                // Transforming the data
                const labels = [];
                const values = [];

                newdata.forEach((item) => {
                  const key = Object.keys(item)[0];
                  const value = item[key];
                  labels.push(key);
                  values.push(value);
                });

                setPieData({
                  labels,
                  datasets: [
                    {
                      data: values,
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.6)",
                        "rgba(54, 162, 235, 0.6)",
                        "rgba(255, 206, 86, 0.6)",
                        "rgba(75, 192, 192, 0.6)",
                        "rgba(153, 102, 255, 0.6)",
                        "rgba(255, 159, 64, 0.6)",
                        "rgba(99, 255, 132, 0.6)",
                        "rgba(235, 54, 162, 0.6)",
                      ],
                    },
                  ],
                });
                setLoading(false);
              } catch (error) {
                console.log(error);
                setLoading(false)
              }
            };
            SubmitForm();
          }}
          className="bg-slate-100"
        >
          <SendHorizontal />
        </Button>
        <br />
      </Flex>
      <Box maxH={'400px'} className="flex justify-center">
        <Pie data={pieData} />
      </Box>
    </Box>
  );
};

export default ExpenditureControl;
