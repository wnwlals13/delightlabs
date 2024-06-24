import { TooltipProps } from "recharts";

type TransactionType = "income" | "expense";

export default function CustomizedTooltip({
  active,
  payload,
}: TooltipProps<number, string>) {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    const { id, date, income_val, expense_val } = item;
    return (
      <div className="tooltip">
        <div>{income_val}</div>
        {/* <div>{expense_val}</div> */}
        <div>{date}</div>
      </div>
    );
  }
  return null;
}
