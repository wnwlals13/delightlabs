import "../styles/togglebtn.css";

export default function ToggleBtn({
  limit,
  handleClick,
}: {
  limit: number;
  handleClick: () => void;
}) {
  return (
    <div className="toggle">
      <button
        className={`week ${limit < 8 ? "active" : ""}`}
        onClick={handleClick}
      >
        Week
      </button>
      <button
        className={`month ${limit > 7 ? "active" : ""}`}
        onClick={handleClick}
      >
        Month
      </button>
    </div>
  );
}
