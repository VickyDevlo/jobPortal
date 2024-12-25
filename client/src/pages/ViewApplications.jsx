import React from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";

export const ViewApplications = () => {
  return (
    <div className="container mx-auto max-sm:p-5 sm:p-8">
      <div>
        <table className="w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm">
          <thead>
            <tr className="border-b text-center">
              <th className="py-2 px-4">Sr.No.</th>
              <th className="py-2 px-4">User Name</th>
              <th className="py-2 px-4 max-sm:hidden">Job Title</th>
              <th className="py-2 px-4 max-sm:hidden">Location</th>
              <th className="py-2 px-4">Resume</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {viewApplicationsPageData.map((applicant, i) => (
              <tr key={i} className="text-gray-700 text-center">
                <td className="py-2 px-4 border-b text-center">{i + 1}</td>
                <td className="border-b">
                  <div className="flex items-center">
                    <img
                      src={applicant.imgSrc}
                      alt=""
                      className="w-8 h-8 rounded-full mr-3 max-sm:hidden"
                    />
                    <span>{applicant.name}</span>
                  </div>
                </td>
                <td className="py-2 px-4 border-b max-sm:hidden">
                  {applicant.jobTitle}
                </td>
                <td className="py-2 px-4 border-b max-sm:hidden">
                  {applicant.location}
                </td>
                <td className="py-2 px-4 border-b">
                  <a
                    href=""
                    target="_black"
                    className="bg-blue-50 text-blue-400 
                  px-3 py-1 rounded inline-flex gap-2 items-center"
                  >
                    Resume
                    <img src={assets.resume_download_icon} alt="" />
                  </a>
                </td>
                <td className="py-2 px-4 border-b relative">
                  <div className="relative inline-block text-left group">
                    <button className="text-gray-500 action-button">...</button>
                    <div className="hidden absolute z-10 right-0 left-0 top-0 mt-2 w-32 bg-white border border-gray-200s rounded shadow group-hover:block">
                      <button className="block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100">
                        Accept
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">
                        Reject
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
