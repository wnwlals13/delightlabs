import "./App.css";
import Header from "./components/items/Header.tsx";
import NaviBar from "./components/items/NaviBar.tsx";
import Contents from "./components/items/Contents.tsx";
import ListSection from "./components/list/ListSection.tsx";
import ChartSection from "./components/chart/ChartSection.tsx";

function App() {
  return (
    <div className="container">
      <Header>
        <h2 className="name">Transactions</h2>
        <div className="alarm-btn">alarm</div>
      </Header>
      <Contents>
        <ChartSection />
        <ListSection />
      </Contents>
      <NaviBar />
    </div>
  );
}

export default App;
