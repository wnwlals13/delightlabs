import { transaction } from "../../repository/transaction";
import React from "react";

/**
 * 리스트 아이템 컴포넌트
 * @param param0
 * @returns
 */
export default function ListItem({ item }: { item: transaction }) {
  const { name, amount, timestamp, type } = item;
  const date = new Date(timestamp);
  const minutes = date.getMinutes();
  const hours = date.getHours() % 12 ? date.getHours() % 12 : date.getHours();
  const ampm = date.getHours() >= 12 ? "PM" : "AM";

  return (
    <div className="list-item-wrapper flex">
      <div className="list-img"></div>
      <div className="list-info flex">
        <div className="list-info-meta">
          <div className="name">{name}</div>
          <div className="amount">{`${amount > 0 ? "+" : "-"}$${Math.abs(
            amount
          )}`}</div>
        </div>
        <div className="list-info-meta">
          <div className="type">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </div>
          <div className="timestamp">
            {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}{" "}
            {ampm}
          </div>
        </div>
      </div>
    </div>
  );
}
