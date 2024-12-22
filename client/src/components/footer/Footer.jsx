import React from "react";
import { assets, footerData } from "../../assets/assets";

const Footer = () => {
  return (
    <div
      className="container mx-auto px-2 py-3 mt-20 2xl:px-20 flex items-center 
    justify-between gap-2"
    >
      <img width={160} src={assets.logo} alt="logo_icon" />
      <p className=" max-sm:hidden flex-1 pl-4 text-sm text-gray-500">
        Copyright @pranav.dev | All right reserved.
      </p>
      <div className="flex gap-2">
        {footerData.map((data, i) => (
          <img
            width={38}
            src={data.image}
            alt={data.label}
            key={i}
            className="cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
};

export default Footer;
