import React from "react";

export default function ButtonWithToolTip({ children, tooltip }) {
  return (
    <div>
      <div className="group flex justify-center">
        {/* <span className="absolute top-10 scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
          ✨ You hover me!
        </span> */}
        <button>{children}</button>
      </div>
    </div>
  );
}
