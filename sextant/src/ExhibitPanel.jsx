import React from "react";
import { useState } from "react";

export default function ExhibitPanel({ exhibits }) {
  // index of exhibit to display
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <div className="border-2 max-w-[1200px] mt-20 mx-auto">
      <div className="divide-x-[2px] flex">
        {exhibits.map((exhibit, index) => (
          <span
            tabIndex="0"
            role="button"
            className={`grow outline-0 ${
              selectedTabIndex === index ? "" : "grow border-b-2"
            }`}
            onClick={() => setSelectedTabIndex(index)}
            onFocus={() => setSelectedTabIndex(index)}
          >
            {exhibit.tabLabel}
          </span>
        ))}
      </div>
      <div>{exhibits[selectedTabIndex].content}</div>
    </div>
  );
}
