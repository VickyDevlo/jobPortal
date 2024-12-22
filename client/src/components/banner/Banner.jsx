import React, { useContext, useRef } from "react";
import { assets } from "../../assets/assets";
import TrustedCompanies from "../trustedCompanies/TrustedCompanies";
import { AppContext } from "../../context/AppContext";
import { Input } from "../../shared";

const Banner = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);
  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    const title = titleRef.current.value;
    const location = locationRef.current.value;

    setSearchFilter({
      title,
      location,
    });
    setIsSearched(true);
  };

  return (
    <div className="container mx-auto my-10 2xl:px-20">
      <div
        className="bg-gradient-to-r from-purple-800 to-purple-950
       text-white py-16 text-center mx-2 rounded-xl"
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
          Over 10,000+ jobs to apply
        </h2>
        <p className="mb-8 max-w-xl mx-auto text-sm font-light px-5">
          Your Next Big Career Move Starts Right Here - Explore the Best Job
          Opportunities and Take the First Step Toward Your Future!
        </p>
        <div
          className="flex items-center justify-center bg-white text-gray-600
         max-w-xl pl-2 md:pl-4 mx-2 sm:mx-auto rounded"
        >
          <Input
            ref={titleRef}
            placeholder={"Search for jobs"}
            img={assets.search_icon}
            className={"max-sm:text-xs p-2 rounded outline-none w-full"}
          />
          <Input
            ref={locationRef}
            placeholder={"Location"}
            img={assets.location_icon}
            className={"max-sm:text-xs p-2 rounded outline-none w-full"}
          />
          <button
            onClick={onSearch}
            className="bg-blue-900 text-xs md:text-base text-white m-1 py-2 px-3 md:px-6 rounded"
          >
            Search
          </button>
        </div>
      </div>
      <TrustedCompanies />
    </div>
  );
};

export default Banner;
