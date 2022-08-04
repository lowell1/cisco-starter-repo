import Banner from "../components/Banner";
import ExhibitPanel from "../components/ExhibitPanel";
import IpDisplay from "../components/exhibits/IpDisplay";
import PacketLatencyGraph from "../components/exhibits/PacketLatencyGraph";

function App() {
  return (
    <div className="bg-black text-white h-screen p-4">
      <Banner />
      <ExhibitPanel
        exhibits={[
          {
            tabLabel: "IPv4 Address",
            content: <IpDisplay />,
          },
          {
            tabLabel: "IPv6 Address",
            content: <IpDisplay useIpv6={true} />,
          },
          {
            tabLabel: "Packet Latency (graph)",
            content: <PacketLatencyGraph />,
          },
        ]}
      />
    </div>
  );
}

export default App;
