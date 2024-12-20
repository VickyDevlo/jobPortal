import React from "react";
import { JobCategories } from "../../assets/assets";

const FilterCategary = () => {
  return (
    <div className="max-lg:hidden">
      <h4 className="font-medium text-lg py-4">Search by Categories</h4>
      <ul className="space-y-4 text-gray-600">
        {JobCategories.map((categary, i) => (
          <li key={i} className="flex gap-3 items-center">
            <input type="checkbox" />
            {categary}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterCategary;
