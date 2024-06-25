import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";
import "../../styles/list.css";
import { getTransaction } from "../../repository/transaction.tsx";

/**
 * 리스트 섹션 컴포넌트
 * @returns
 */
export default function ListSection() {
  const [isContent, setIsContent] = useState(0); // 선택된메뉴탭
  const [allData, setAllData] = useState([]); // 최근 거래내역
  const [menu] = useState(["All", "Expense", "Income"]);

  const handleClickTransaction = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setIsContent(index);
    loadData(index);
  };

  const loadData = async (index: number) => {
    let param = index == 0 ? "_limit=20&" : "";

    const data = await getTransaction(param);

    // if (index === 0) setAllData(data);
    // else if (index === 1) {
    //   const filtered = data.filter((v: any) => v.amount >= 0);
    //   setAllData(filtered);
    // } else if (index === 2) {
    //   const filtered = data.filter((v: any) => v.amount < 0);
    //   setAllData(filtered);
    // }
  };

  useEffect(() => {
    loadData(0);
  }, []);

  return (
    <div className="list-section flex">
      <h2 className="list-name">Recent Transactions</h2>
      <ul className="list-menu flex">
        {menu.map((item, idx) => (
          <li
            key={idx}
            className={`${isContent === idx ? "active" : "non-active"}`}
          >
            <a href="" onClick={(e) => handleClickTransaction(e, idx)}>
              {item}
            </a>
          </li>
        ))}
      </ul>
      <div>
        {allData.map((data, idx) => (
          <ListItem key={idx} item={data} />
        ))}
      </div>
    </div>
  );
}
