import { TooltipProps } from "recharts";
import "../../styles/chart.css";

type TransactionType = "income" | "expense";

export default function CustomizedTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    const { id, date, income_val, expense_val } = item;

    let income = Math.round(income_val * 100)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    let expense = Math.round(expense_val * 100)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    let theDate = new Date(date);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let mm = months[theDate.getMonth()];
    let dd = theDate.getDate();

    return (
      <div className="tooltip">
        <span className="income">{`+$${income}`}</span>
        <span className="expense">{`-$${expense}`}</span>
        <span>{`${mm} ${dd}`}</span>
      </div>
    );
  }
  return null;
}
