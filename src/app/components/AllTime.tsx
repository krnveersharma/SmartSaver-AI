"use client";
import React, { useEffect, useState } from "react";
import {Box, Button, Text } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
type Expenditure = {
  id: string;
  expense: number;
  date: Date;
  name:string,
  userId: string;
};
type UserData = {
  id: String;
  username: string;
  email: string;
  phone: string;
  password: string;
  Income: number;
  iat: number;
  exp: number;
  expenditure: [Expenditure];
};
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};
const AllTime = () => {
  const [data, setData] = useState<UserData>({
    id: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    Income: 0,
    iat: 0,
    exp: 0,
    expenditure: [{ id: "loading", expense: 0, date: new Date(), userId: "0" ,name:'loading'}],
  });
  
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: "Spends",
        data: [] as number[],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {

    // Update chart data
    const newChartData = {
      labels: data.expenditure.map((temp) => 
        temp.name +' '+ temp.date.toString().split('T')[0])
        , // Extract date string
      datasets: [
        {
          label: "Spends",
          data: data.expenditure.map((temp) => temp.expense),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
    setChartData(newChartData);
  }, [data])
  useEffect(() => {
    const userData = async () => {
      try {
        const response = await fetch("/api/getUser", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const val: UserData = await response.json();
        setData(val[0]);
      } catch (error) {
        console.log(error);
      }
    };
    userData();
  }, []);
  return (
    <Box>
      <Line options={options} data={chartData}/>
    </Box>
  )
};
export default AllTime;