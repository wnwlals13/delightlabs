import "./App.css";
import Header from "./components/Header.tsx";
import NaviBar from "./components/NaviBar.tsx";
import Contents from "./components/Contents.tsx";
import ToggleBtn from "./components/ToggleBtn.tsx";
import ListSection from "./components/ListSection.tsx";
import GraphSection from "./components/GraphSection.tsx";
import { useEffect, useState } from "react";
import { transaction } from "./components/ListItem.tsx";

function App() {
  const [data, setData] = useState<transaction[]>([
    { name: "test", amount: 420.02, timestamp: "2024-20-20", type: "Transfer" },
    { name: "test", amount: 420.02, timestamp: "2024-20-20", type: "Transfer" },
  ]);

  // const [incomes, setIncomes] = useState<transaction[]>([]);
  // const [expenses, setExpenses] = useState<transaction[]>([]);

  // 1. 날짜 범위 내에 입출금 데이터 조회 (7일/30일)
  // 2. 최근 출금 내역 10건
  // 3. 최근 입금 내역 10건
  // 4. 최근 입출금 내역 총 20건
  // useEffect(() => {
  //   fetch("http://localhost:3001/transaction?_limit=30&_sort=-timestamp")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // 전체 데이터 저장
  //       setData(data);
  //       //
  //     });
  // }, []);

  // useEffect(() => {
  //   // console.log(data);
  //   const incomeData: transaction[] = [];
  //   const expenseData: transaction[] = [];
  //   data.forEach((item) =>
  //     item.amount > 0 ? incomeData.push(item) : expenseData.push(item)
  //   );
  //   setIncomes(incomeData);
  //   setExpenses(expenseData);
  //   console.log("incomes", incomes, "expenses", expenses);
  // }, [data]);

  // const handleClickTransaction = () => {
  //   console.log("click");
  // };

  return (
    <div className="container">
      <Header />
      <Contents>
        {/* graph header */}

        {/* graph */}
        <GraphSection />
        {/* graph list */}
        <ListSection
        // items={data}
        // handleClickTransaction={handleClickTransaction}
        />
      </Contents>
      <NaviBar />
    </div>
  );
}

export default App;
