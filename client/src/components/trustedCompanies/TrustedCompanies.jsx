import React from "react";
import { TrustedBy } from "../../assets/assets";

const TrustedCompanies = () => {
  return (
    <div className="border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex">
      <div className="flex justify-center gap-10 lg:gap-16 flex-wrap">
        <p className="font-medium underline text-gray-600">Trusted by</p>
        {TrustedBy.map((image, i) => (
          <img src={image} key={i} alt="trusted_logo" className="h-6" />
        ))}
      </div>
    </div>
  );
};

export default TrustedCompanies;
