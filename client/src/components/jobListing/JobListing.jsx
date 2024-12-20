import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { assets, JobCategories, JobLocations } from "../../assets/assets";
import { FilterBy, JobCard } from "../../shared";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } =
    useContext(AppContext);

  const [showFilter, setShowFilter] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="container mx-auto 2xl:px-20 flex flex-row max-lg:flex-col max-lg:space-y-8 py-8">
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

        <button
          onClick={() => setShowFilter(!showFilter)}
          className="lg:hidden px-6 py-1.5 border border-gray-400 rounded"
        >
          {showFilter ? "Filters" : "Close"}
        </button>

        <div className={`${showFilter && "max-lg:hidden"}`}>
          <FilterBy title={"Categories"} categaries={JobCategories} />
          <FilterBy
            title={"Locations"}
            categaries={JobLocations}
            className={"pt-14"}
          />
        </div>
      </div>
      <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
        <h3 className="font-medium text-3xl py-2" id="job-list">
          Latest jobs
        </h3>
        <p className="mb-8">Get your desired job from top companies</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {jobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, i) => (
            <JobCard key={i} job={job} />
          ))}
        </div>

        {/* pagination */}
        {jobs.length > 0 && (
          <div className="flex items-center justify-center space-x-3 mt-10">
            <a href="#job-list">
              <img
                onClick={() => setCurrentPage(Math.max(currentPage - 1))}
                src={assets.left_arrow_icon}
                alt=""
                className={`${currentPage === 1 ? "hidden" : ""}`}
              />
            </a>
            {Array.from({ length: Math.ceil(jobs.length / 6) }).map((_, i) => (
              <a href="#job-list" key={i}>
                <button
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${
                    currentPage === i + 1
                      ? "bg-blue-100 text-blue-500"
                      : "text-gray-500"
                  }`}
                >
                  {i + 1}
                </button>
              </a>
            ))}
            <a href="#job-list">
              <img
                onClick={() =>
                  setCurrentPage(
                    Math.min(currentPage + 1, Math.ceil(jobs.length / 6))
                  )
                }
                src={assets.right_arrow_icon}
                alt=""
                className={`${
                  currentPage === Math.ceil(jobs.length / 6) ? "hidden" : ""
                }`}
              />
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
