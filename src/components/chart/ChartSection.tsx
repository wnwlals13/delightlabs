import { useState } from "react";
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
        <Chart
          limit={limit}
          limitDays={limitDays}
          setLimitDays={setLimitDays}
        />
      </div>
    </>
  );
}
