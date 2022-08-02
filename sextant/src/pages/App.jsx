import Banner from "../components/Banner";
import ExhibitPanel from "../components/ExhibitPanel";
import IpDisplay from "../components/exhibits/IpDisplay";

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
        ]}
      />
    </div>
  );
}

export default App;
