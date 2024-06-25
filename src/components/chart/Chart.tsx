import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomizedTooltip from "./CustomizedTooltip";
import { graphData } from "./ChartSection";
import { getTransaction } from "../../repository/transaction.tsx";

export default function Chart({
  limit,
  limitDays,
}: {
  limit: number;
  limitDays: string[];
}) {
  const [graphData, setGraphData] = useState<graphData[]>([]); //그래프 데이터
  const [incomes, setIncomes] = useState<{ [key: string]: number }>({}); // 입금내역
  const [expenses, setExpenses] = useState<{ [key: string]: number }>({}); // 출금내역

  // limitDays에 맞게 그래프 데이터를 세팅한다.
  useEffect(() => {
    dataFromat();
  }, [limitDays]);

  /* Function : 원하는 날짜대로 데이터 포맷 */
  const dataFromat = async () => {
    let data = await getTransaction("");

    // 1. limit에 맞게 원하는 날짜에 포함되는 데이터만 저장
    data = data.filter(
      (item: any) =>
        new Date(item.timestamp) >= new Date(limitDays[0]) &&
        new Date(item.timestamp) <=
          new Date(`${limitDays[limitDays.length - 1]} 23:59:59`)
    );

    // 2. 입금/출금 구분한다.
    const income = data.filter((item: any) => +item.amount >= 0);
    const expense = data.filter((item: any) => +item.amount < 0);

    // 3. 같은 날짜(YYYY-MM-DD)를 기준으로 그룹화한다.
    const incomeResult = income.reduce((acc: any, cur: any) => {
      let { timestamp } = cur;
      let theDate = new Date(timestamp);
      let theYear = theDate.getFullYear();
      let theMonth = theDate.getMonth() + 1;
      let theDay = theDate.getDate();

      let dateString = theYear + "-" + theMonth + "-" + theDay;

      if (acc[dateString]) acc[dateString][0] += +cur.amount;
      else acc[dateString] = [+cur.amount];
      return acc;
    }, {});
    setIncomes(incomeResult);

    const expenseResult = expense.reduce((acc: any, cur: any) => {
      let { timestamp } = cur;
      let theDate = new Date(timestamp);
      let theYear = theDate.getFullYear();
      let theMonth = theDate.getMonth() + 1;
      let theDay = theDate.getDate();

      let dateString = theYear + "-" + theMonth + "-" + theDay;
      if (acc[dateString]) acc[dateString][0] += Math.abs(+cur.amount);
      else acc[dateString] = [Math.abs(+cur.amount)];
      return acc;
    }, {});
    setExpenses(expenseResult);
  };

  /* 입출금 데이터에 따라 그래프에 맞게 변형해준다. */
  useEffect(() => {
    let graphs: graphData[] = limitDays.map((item) => {
      return { date: item };
    });

    graphs.map((item) => (item["income_val"] = incomes[item.date]));
    graphs.map((item) => (item["expense_val"] = expenses[item.date]));
    setGraphData(graphs);
  }, [incomes, expenses]);

  /* Function : x축 format함수 */
  const formatXAxis = (tickItem: string, index: number) => {
    if (tickItem) {
      if (tickItem.slice(-2).indexOf("-") < 0) return `${tickItem.slice(-2)}`;
      else return `${tickItem.slice(-1)}`;
    }
    return "";
  };

  /* Function : y축 format함수 */
  const formatYAxis = () => "";
  return (
    <ResponsiveContainer width="100%" height={185}>
      {graphData.length > 0 ? (
        <AreaChart width={300} height={300} data={graphData}>
          <Area
            type="monotone"
            dataKey="income_val[0]"
            stroke="#363062"
            fillOpacity={1}
            fill="url(#colorIncome_val)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="expense_val[0]"
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
            cursor={{ stroke: "transparent", fill: "black" }}
            offset={-50}
            contentStyle={{ background: "#363062", color: "#ffffff" }}
            content={<CustomizedTooltip />}
          />
          <XAxis
            dataKey={"date"}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatXAxis}
          />
          <YAxis
            type="number"
            width={4}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatYAxis}
          />
        </AreaChart>
      ) : (
        <></>
      )}
    </ResponsiveContainer>
  );
}
