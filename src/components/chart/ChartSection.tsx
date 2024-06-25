import { useEffect, useState } from "react";
import "../../styles/chart.css";
import ToggleBtn from "../items/ToggleBtn";
import Chart from "./Chart";

export interface graphData {
  date: string;
  income_val?: number;
  expense_val?: number;
}

export default function ChartSection() {
  const [limit, setLimit] = useState(7); // [주간/월간 차트] default: week(7), optional: month(30)
  const [limitDays, setLimitDays] = useState<string[]>([]);
  const [dateFormat, setDateFormat] = useState(new Date());

  /* function : chart 기간 구하기 */
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
      });
    }
    setLimitDays(days);
    // setGraphData(graphs);
  };

  useEffect(() => {
    // 이번주 혹은 이번달 구하기
    getThisWeekOrMonth(limit);
  }, [limit]);

  return (
    <>
      <div className="toggle-section">
        <ToggleBtn
          limit={limit}
          handleClick={() => setLimit((prev) => (prev > 7 ? 7 : 30))}
          items={["week", "month"]}
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
        <Chart limit={limit} limitDays={limitDays} />
      </div>
    </>
  );
}
