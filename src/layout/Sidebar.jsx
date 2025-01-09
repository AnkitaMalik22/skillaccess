import React, { useState } from "react";

const Sidebar = ({ open, selection, handleNavigation, items }) => {
  const [hovered, setHovered] = useState();

  return (
    <aside
      className={`flex flex-col justify-between px-2 sm:px-4 transition-width overflow-x-hidden bg-secondary z-30 scrollbar overflow-y-scroll ${
        open ? "w-1/2" : "lg:w-[260px] w-20"
      }`}
    >
      <ul className="list-none">
        {items.map((item, index) => (
          <li
            key={index}
            className={`btn-transition ${
              selection === index ? "active-li" : ""
            }`}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleNavigation(item.path)}
          >
            <button
              className={`flex gap-4 mb-8 h-fit py-2 justify-start btn hover-li ${
                open ? "w-full" : "lg:w-full"
              } shadow-none text-white rounded-md border-none focus:outline-none max-w-xs mx-auto ${
                selection === index
                  ? "bg-white !text-[#171717]"
                  : "bg-transparent"
              }`}
            >
              <div>{item.icon(hovered === index || selection === index)}</div>
              <h3
                className={`text-lg font-bold font-dmSans ${
                  open ? "" : "lg:block hidden"
                } w-fit h-fit`}
              >
                {item.name}
              </h3>
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-auto mb-5 text-center font-dmSans text-lg font-bold">
        <h2 className="text-white">© {new Date().getFullYear()} Skillaccess</h2>
      </div>
    </aside>
  );
};

export default Sidebar;
