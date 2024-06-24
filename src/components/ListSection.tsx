import React, { useEffect, useState } from "react";
import ListItem, { transaction } from "./ListItem";
import "../styles/list.css";

export default function ListSection() {
  const [isContent, setIsContent] = useState(0);
  const [allData, setAllData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [outcomeData, setOutcomeData] = useState([]);

  const handleClickTransaction = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setIsContent(index);
    loadData(index);
  };

  const loadData = (index: number) => {
    if (index === 0) {
      fetch("http://localhost:3001/transaction?_limit=20&_sort=-timestamp")
        .then((res) => res.json())
        .then((data) => {
          setAllData(data);
        });
    } else if (index === 1) {
      fetch("http://localhost:3001/transaction?_sort=-timestamp")
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.filter((v: any) => v.amount >= 0);
          console.log(filtered.slice(0, 10));
          setAllData(filtered.slice(0, 10));
        });
    } else if (index === 2) {
      fetch("http://localhost:3001/transaction?_sort=-timestamp")
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.filter((v: any) => v.amount < 0);
          console.log(filtered.slice(0, 10));
          setAllData(filtered.slice(0, 10));
        });
    }
  };

  useEffect(() => {
    loadData(0);
  }, []);

  return (
    <div className="list-section flex">
      <h2 className="list-name">Recent Transactions</h2>
      <ul className="list-menu flex">
        <li className={`${isContent === 0 ? "active" : "non-active"}`}>
          <a href="" onClick={(e) => handleClickTransaction(e, 0)}>
            All
          </a>
        </li>
        <li className={`${isContent === 1 ? "active" : "non-active"}`}>
          <a href="" onClick={(e) => handleClickTransaction(e, 1)}>
            Expense
          </a>
        </li>
        <li className={`${isContent === 2 ? "active" : "non-active"}`}>
          <a href="" onClick={(e) => handleClickTransaction(e, 2)}>
            Income
          </a>
        </li>
      </ul>
      <div>
        {allData.map((data, idx) => (
          <ListItem key={idx} item={data} />
        ))}
      </div>
    </div>
  );
}
