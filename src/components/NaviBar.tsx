import React, { useState } from "react";

export default function NaviBar() {
  const [selected, setSelected] = useState("activity");

  const menus = [
    {
      name: "dashboard",
      image: "./src/assets/nav-dashboard.png",
    },
    {
      name: "card",
      image: "./src/assets/nav-card.png",
    },
    {
      name: "activity",
      image: "./src/assets/nav-activity.png",
    },
    {
      name: "user",
      image: "./src/assets/nav-my.png",
    },
  ];

  return (
    <nav>
      <ul>
        {menus.map((menu) => (
          <li key={menu.name}>
            <a>
              <img
                src={`${
                  selected === menu.name
                    ? menu.image.slice(0, menu.image.length - 4) + "-active.png"
                    : menu.image
                }`}
                alt={menu.name}
              />
            </a>
            {selected === menu.name ? (
              <div className="navbar-bottom"></div>
            ) : (
              ""
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
