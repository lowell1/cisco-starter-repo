import React from "react";
import { useState } from "react";

export default function ExhibitPanel({ exhibits }) {
  // index of exhibit to display
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    // <div className="h-full flex items-center justify-center">
    <div className="border-2 max-w-[1200px]">
      <div className="divide-x-[2px] flex">
        {exhibits.map((exhibit, index) => (
          <span
            role="button"
            className={selectedTabIndex === index ? "grow " : "grow border-b-2"}
            onClick={() => setSelectedTabIndex(index)}
          >
            {exhibit.tabLabel}
          </span>
        ))}
      </div>
      <div>{exhibits[selectedTabIndex].content}</div>
    </div>
    // </div>
  );
}
// export default function ExhibitPanel({ exhibits }) {
//   // index of exhibit to display
//   const [selectedTabIndex, setSelectedTabIndex] = useState(0);

//   return (
//     <div className="h-full flex items-center justify-center">
//       <div className="border-2 min-w-[50%]">
//         <div className="divide-x-[2px]">
//           {exhibits.map((exhibit, index) => (
//             <span
//               role="button"
//               className={`flex justify-between ${
//                 selectedTabIndex === index ? "" : "border-b-2"
//               }`}
//               onClick={() => setSelectedTabIndex(index)}
//             >
//               {exhibit.tabLabel}
//             </span>
//           ))}
//         </div>
//         <div>{exhibits[selectedTabIndex].content}</div>
//       </div>
//     </div>
//   );
// }
