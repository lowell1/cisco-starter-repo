import React, { useEffect, useState } from "react";
import { w3cwebsocket } from "websocket";
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
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PacketLatencyGraph() {
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    let webSocketClient;

    try {
      webSocketClient = new w3cwebsocket("ws://localhost:55455");

      webSocketClient.onmessage = ({ data }) => {
        let timestamp = parseInt(data, 10);

        const latency = new Date().getTime() - timestamp;

        setDataPoints((curDataPoints) => [...curDataPoints.slice(-9), latency]);
      };

      webSocketClient.onerror = () => console.log("Connection error");
      webSocketClient.onclose = () => console.log("Connection closed");
    } catch (error) {
      console.log(error);
    } finally {
      return function () {
        if (webSocketClient) webSocketClient.close();
      };
    }
  }, [setDataPoints]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        title: {
          color: "white",
          display: true,
          text: "Latency (milliseconds)",
        },
      },
    },
  };

  const data = {
    labels: dataPoints.map(() => ""),
    datasets: [
      {
        // label: "Dataset 1",
        data: dataPoints,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
