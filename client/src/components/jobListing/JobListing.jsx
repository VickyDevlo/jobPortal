import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import FilterCategary from "../filterCategary/FilterCategary";
import FilterLocation from "../filterLocations/FilterLocation";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter } = useContext(AppContext);
  return (
    <div className="container mx-auto 2xl:px-20 flex flex-col max-lg:flex-row max-lg:space-y-8 py-8">
      <div className="w-full lg:w-1/4 bg-white px-4">
        {isSearched &&
          (searchFilter.title !== "" || searchFilter.location !== "") && (
            <>
              <h3 className="text-gray-600 font-medium text-lg mb-4">
                Current Search
              </h3>
              <div className="mb-4 text-gray-800">
                {searchFilter.title && (
                  <span
                    className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200
                  px-4 py-1.5 rounded"
                  >
                    {searchFilter.title}
                    <img
                      src={assets.cross_icon}
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, title: "" }))
                      }
                      alt=""
                      className="cursor-pointer"
                    />
                  </span>
                )}
                {searchFilter.location && (
                  <span
                    className="ml-1 inline-flex items-center gap-2.5
                     bg-red-50 border border-red-200
                  px-4 py-1.5 rounded"
                  >
                    {searchFilter.location}
                    <img
                      src={assets.cross_icon}
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, location: "" }))
                      }
                      alt=""
                      className="cursor-pointer"
                    />
                  </span>
                )}
              </div>
            </>
          )}
        <div className="">
          <FilterCategary />
          <FilterLocation />
        </div>
      </div>
    </div>
  );
};

export default JobListing;
