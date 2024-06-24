import React, { useEffect, useState } from "react";
import "../styles/graph.css";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import CustomizedTooltip from "./CustomizedTooltip";
import ToggleBtn from "./ToggleBtn";

type graphData = {
  date: string;
  income_val: number;
  expense_val: number;
};

export default function GraphSection() {
  // week = 7개
  // month = 30개
  const [limit, setLimit] = useState(7);
  const [dateFormat, setDateFormat] = useState(new Date());
  const [graphData, setGraphData] = useState<graphData[]>([]);

  const data: graphData[] = [
    { date: "00", income_val: 432.9, expense_val: 200 },
    { date: "01", income_val: 800, expense_val: 500 },
    { date: "02", income_val: 700, expense_val: 400 },
    { date: "03", income_val: 1200, expense_val: 300 },
  ];

  useEffect(() => {
    console.log(limit);
    fetch("http://localhost:3001/transaction?_sort=-timestamp")
      .then((res) => res.json())
      .then((data) => {
        // 전체 데이터 저장
        const income = data
          .filter(
            (item: any) =>
              new Date(item.timestamp) >= new Date("2024-06-24") &&
              new Date(item.timestamp) <= new Date("2024-06-30")
          )
          .filter((item: any) => item.amount > 0);
        let totlaIncome = 0;

        income.map((item: any) => {
          return (totlaIncome += parseInt(item.amount));
        });
        console.log(totlaIncome);
        //   setGraphData(data);
        //   //
      });
  }, [limit]);

  return (
    <>
      <div className="toggle-section">
        <ToggleBtn
          limit={limit}
          handleClick={() => setLimit((prev) => (prev > 8 ? 7 : 30))}
        />
        <div className="toggle-date">
          {`${dateFormat.getMonth()} ${dateFormat.getDate()}, ${dateFormat.getFullYear()}`}
        </div>
      </div>
      <div className="graph-section">
        <div className="graph-index flex">
          <div className="graph-index-item flex">
            <span className={`bar income`}></span>
            <span>Income</span>
          </div>
          <div className="graph-index-item flex">
            <span className={`bar expense`}></span>
            <span>Expense</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={185}>
          <AreaChart width={300} height={300} data={data}>
            <Area
              type="monotone"
              dataKey="income_val"
              stroke="#363062"
              fillOpacity={1}
              fill="url(#colorIncome_val)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="expense_val"
              stroke="#5bdaa4"
              fillOpacity={1}
              fill="url(#colorExpense_val)"
              strokeWidth={2}
            />
            <defs>
              <linearGradient id="colorIncome_val" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#363062" stopOpacity={0.2} />
                <stop offset="75%" stopColor="#363062" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpense_val" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.3} />
                <stop offset="75%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip
              cursor={{ stroke: "transparent" }}
              offset={-50}
              contentStyle={{ background: "#363062", color: "#ffffff" }}
              content={<CustomizedTooltip />}
            />
            <XAxis dataKey={"date"} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
