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

  // time in milliseconds to update latency graph
  const intervalTime = 1000;

  useEffect(() => {
    let webSocketClient;
    let intervalId;

    // time since epoch when the last packet was recieved
    let lastPacketTime = null;

    // latencies of each packet since the last time graph was updated
    let packetLatencies = [];

    let latencyAverages = [];

    function average(arr) {
      return arr.reduce((prev, cur) => prev + cur, 0) / arr.length;
    }

    function updateDataPoints() {
      //   console.log({ packetLatencies, avg: average(packetLatencies) });
      //   if (isNaN(average(packetLatencies)))
      //     console.log("nan", average(packetLatencies));
      if (packetLatencies.length === 0) return;

      latencyAverages = [...latencyAverages, average(packetLatencies)];
      setDataPoints(latencyAverages);
      console.log({ latencyAverages });
      //   setDataPoints((dataPoints) => {
      //     console.log({ dataPoints });
      //     return [...dataPoints, average(packetLatencies)];
      //   });
      //   console.log(dataPoints);
      packetLatencies = [];
      lastPacketTime = null;
    }

    try {
      webSocketClient = new w3cwebsocket("ws://localhost:55455");

      webSocketClient.onmessage = ({ data }) => {
        let curPacketTime = parseInt(data, 10);

        // console.log({ curPacketTime, lastPacketTime });

        if (lastPacketTime !== null)
          packetLatencies = [
            ...packetLatencies,
            curPacketTime - lastPacketTime,
          ];

        lastPacketTime = curPacketTime;
      };

      intervalId = setInterval(updateDataPoints, intervalTime);

      webSocketClient.onerror = () => console.log("Connection error");

      webSocketClient.onclose = () => console.log("Connection closed");
    } catch (error) {
      console.log(error);
    } finally {
      return function () {
        if (webSocketClient) webSocketClient.close();
        if (intervalId) clearInterval(intervalId);
      };
    }
  }, [setDataPoints]);
  console.log({ dataPoints });

  //   const labels = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //   ];

  const options = {
    responsive: true,
    plugins: {
      //   legend: {
      //     position: "right",
      //   },
      title: {
        display: true,
        text: "Network Latency",
      },
    },
  };

  //   const data = {
  //     labels,
  //     datasets: [
  //       {
  //         label: "Dataset 1",
  //         data: labels.map(() => Math.random() * 1000),
  //         borderColor: "rgb(255, 99, 132)",
  //         backgroundColor: "rgba(255, 99, 132, 0.5)",
  //       },
  //     ],
  //   };
  //   console.log(dataPoints);
  const data = {
    labels: dataPoints.map((val, idx) => intervalTime * idx),
    datasets: [
      {
        label: "Dataset 1",
        data: dataPoints,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}

// export default function PacketLatencyGraph() {
//   useEffect(() => {
//     let webSocketClient;

//     // time since epoch when the last packet was recieved
//     let lastPacketTime = null;

//     // latencies of each packet in the current sample
//     let packetLatencies = [];

//     // amount of packet latencies to capture for each sample
//     const packetSampleSize = 10;

//     function average(arr) {
//       return arr.reduce((prev, cur) => prev + cur, 0) / arr.length;
//     }

//     // update array of packet latencies or clear them once array size has reached the sample size and update the graph
//     function updatePacketLatencies(curPacketTime) {
//       if (lastPacketTime) {
//         if (packetLatencies.length < packetSampleSize)
//           packetLatencies.push(curPacketTime - lastPacketTime);
//         else {
//           // update graph...
//           //   console.log(packetLatencies);
//           packetLatencies = [];
//         }
//       }
//       lastPacketTime = curPacketTime;
//     }

//     try {
//       webSocketClient = new w3cwebsocket("ws://localhost:55455");

//       webSocketClient.onmessage = ({ data }) => {
//         let curPacketTime = parseInt(data, 10);

//         updatePacketLatencies(curPacketTime);
//       };

//       webSocketClient.onerror = () => console.log("Connection error");

//       webSocketClient.onclose = () => console.log("Connection closed");
//     } catch (error) {
//       console.log(error);
//     } finally {
//       return function () {
//         if (webSocketClient) webSocketClient.close();
//       };
//     }
//   }, []);

//   const labels = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//   ];

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: "Dataset 1",
//         data: [1, 2, 3],
//         backgroundColor: "rgba(255, 99, 132, 0.5)",
//       },
//       {
//         label: "Dataset 2",
//         data: [5, 1, 48198],
//         backgroundColor: "rgba(53, 162, 235, 0.5)",
//       },
//     ],
//   };

//   return <Line data={data} />;
// }
