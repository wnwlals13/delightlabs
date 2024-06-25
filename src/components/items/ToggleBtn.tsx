import "../../styles/togglebtn.css";

/**
 * 토글버튼UI
 * @param param0
 * @returns
 */
export default function ToggleBtn({
  limit,
  handleClick,
  items,
}: {
  limit: number;
  handleClick: () => void;
  items: string[];
}) {
  return (
    <div className="toggle">
      <button
        className={`week ${limit < 8 ? "active" : ""}`}
        onClick={handleClick}
      >
        {items && items[0]}
      </button>
      <button
        className={`month ${limit > 7 ? "active" : ""}`}
        onClick={handleClick}
      >
        {items && items[1]}
      </button>
    </div>
  );
}
