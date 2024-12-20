import React from "react";
import { JobLocations } from "../../assets/assets";

const FilterLocation = () => {
  return (
    <div className="max-lg:hidden mt-8">
      <h4 className="font-medium text-lg py-4">Search by Locations</h4>
      <ul className="space-y-4 text-gray-600">
        {JobLocations.map((location, i) => (
          <li key={i} className="flex gap-3 items-center">
            <input type="checkbox" />
            {location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterLocation;
