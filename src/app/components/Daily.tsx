"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
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
  name: string;
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
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};
const Daily = () => {
  const [data, setData] = useState<UserData>({
    id: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    Income: 0,
    iat: 0,
    exp: 0,
    expenditure: [
      {
        id: "loading",
        expense: 0,
        date: new Date(),
        userId: "0",
        name: "loading",
      },
    ],
  });
  const [dailyExpend, setDailyExpend] = useState([]);

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
    const d = [];
    if (!data.expenditure[0]) {
      setDailyExpend(d);
    } else {
      let prevd = data.expenditure[0].date.toString().split("T")[0];
      let cost = data.expenditure[0].expense;

      for (let i = 1; i < data.expenditure.length; i++) {
        if (prevd != data.expenditure[i].date.toString().split("T")[0]) {
          d.push({
            expense: cost,
            date: prevd,
          });
          prevd = data.expenditure[i].date.toString().split("T")[0];
          cost = data.expenditure[i].expense;
        } else {
          cost += data.expenditure[i].expense;
        }
      }
      d.push({
        expense: cost,
        date: prevd,
      });
      setDailyExpend(d);
    }
  }, [data]);
  useEffect(() => {
    const newChartData = {
      labels: dailyExpend.map((temp) => temp.date.toString().split("T")[0]), // Extract date string
      datasets: [
        {
          label: "Spends",
          data: dailyExpend.map((temp) => temp.expense),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };
    setChartData(newChartData);
  }, [dailyExpend]);
  useEffect(() => {
    const userData = async () => {
      try {
        const response = await fetch("/api/getUser", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const val = await response.json();
        setData(val.message[0]);
      } catch (error) {
        console.log(error);
      }
    };
    userData();
  }, []);
  return (
    <Box  >
      <Line  options={options} data={chartData} />
    </Box>
  );
};
export default Daily;
