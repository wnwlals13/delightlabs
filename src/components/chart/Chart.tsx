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
  setLimitDays,
}: {
  limit: number;
  limitDays: string[];
  setLimitDays: any;
}) {
  const [dateFormat, setDateFormat] = useState(new Date());
  const [graphData, setGraphData] = useState<graphData[]>([]);
  const [incomes, setIncomes] = useState<{ [key: string]: number }>({});
  const [expenses, setExpenses] = useState<{ [key: string]: number }>({});

  const getThisWeekOrMonth = (limit: number) => {
    const year = dateFormat.getFullYear();
    const month = dateFormat.getMonth();
    const date = dateFormat.getDate();
    const dayOfWeek = dateFormat.getDay();

    let days = [];
    if (limit <= 7) {
      // 일주일
      for (let i = 0; i < limit; i++) {
        let resultDay = new Date(year, month, date + (i - dayOfWeek + 1));
        let yyyy = resultDay.getFullYear();
        let mm = resultDay.getMonth();
        let dd = resultDay.getDate();

        days[i] = yyyy + "-" + mm + "-" + dd;
      }
    } else {
      // 30일
      let firstDay = new Date(year, month, 1);
      let lastDay = new Date(year, month + 1, 0);
      let len = lastDay.getDate();
      for (let i = 0; i < len; i++) {
        let resultDay = new Date(year, month, firstDay.getDate() + i);
        let yyyy = resultDay.getFullYear();
        let mm = resultDay.getMonth();
        let dd = resultDay.getDate();

        days[i] = yyyy + "-" + mm + "-" + dd;
      }
    }

    const graphs: graphData[] = [];
    for (let i = 0; i < days.length; i++) {
      graphs.push({
        date: days[i],
        income_val: i * 100,
        expense_val: i * 200,
      });
    }
    setLimitDays(days);
    setGraphData(graphs);
  };

  useEffect(() => {
    // 이번주 혹은 이번달 구하기
    getThisWeekOrMonth(limit);
  }, [limit]);

  useEffect(() => {
    // console.log(graphData);
  }, [graphData]);

  // useEffect(() => {
  //   graphData.map((item) => {
  //     item.income_val = incomes[item.date];
  //     item.expense_val = expenses[item.date];
  //   });
  // }, [incomes, expenses]);

  useEffect(() => {
    // 1. limit 에 포함되는 날짜 데이터만 저장
    // data = data.filter(
    //   (item: any) =>
    //     new Date(item.timestamp) >= new Date(limitDays[0]) &&
    //     new Date(item.timestamp) <=
    //       new Date(`${limitDays[limitDays.length - 1]} 23:59:59`)
    // );
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/transaction?_sort=-timestamp")
      .then((res) => res.json())
      .then((data) => {
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
      });
  }, [limitDays]);

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

  useEffect(() => {}, [graphData]);
  return (
    <ResponsiveContainer width="100%" height={185}>
      <AreaChart width={300} height={300} data={graphData}>
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
    </ResponsiveContainer>
  );
}
