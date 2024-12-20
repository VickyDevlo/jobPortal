import React from "react";

export const FilterBy = ({ title, categaries, className }) => {
  return (
    <div>
      <h4 className={`font-medium text-lg py-4 ${className}`}>
        Search by {title}
      </h4>
      <ul className="space-y-4 text-gray-600">
        {categaries.map((categary, i) => (
          <li key={i} className="flex gap-3 items-center">
            <input type="checkbox" /> {categary}
          </li>
        ))}
      </ul>
    </div>
  );
};
