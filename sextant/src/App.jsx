import Banner from "./Banner";
import ExhibitPanel from "./ExhibitPanel";

function App() {
  return (
    <div className="bg-black text-white h-screen">
      <Banner />
      <ExhibitPanel
        exhibits={[
          {
            tabLabel: "tab1",
            content: <p>first exhibit</p>,
          },
          { tabLabel: "tab2", content: <p>second exhibit</p> },
        ]}
      />
    </div>
  );
}

export default App;
