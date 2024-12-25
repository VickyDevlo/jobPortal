import React from "react";
import { manageJobsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export const ManageJobs = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto max-w-5xl max-sm:p-5 sm:p-8">
      <div className="overflow-x-auto">
        <table
          className="min-w-full bg-white max-sm:text-sm border 
        border-gray-200"
        >
          <thead>
            <tr className="text-center">
              <th className="py-2 px-4 border-b max-sm:hidden">Sr.No.</th>
              <th className="py-2 px-4 border-b">Job Title</th>
              <th className="py-2 px-4 border-b max-sm:hidden">Date</th>
              <th className="py-2 px-4 border-b max-sm:hidden">Location</th>
              <th className="py-2 px-4 border-b">Applicants</th>
              <th className="py-2 px-4 border-b">Visible</th>
            </tr>
          </thead>
          <tbody>
            {manageJobsData.map((manageJob, i) => (
              <tr key={i} className="text-center text-gray-700">
                <td className="py-2 px-4 border-b max-sm:hidden">{i + 1}</td>
                <td className="py-2 px-4 border-b">{manageJob.title}</td>
                <td className="py-2 px-4 border-b max-sm:hidden">
                  {moment(manageJob.date).format("ll")}
                </td>
                <td className="py-2 px-4 border-b max-sm:hidden">
                  {manageJob.location}
                </td>
                <td className="py-2 px-4 border-b">{manageJob.applicants}</td>
                <td className="py-2 px-4 border-b">
                  <input type="checkbox" className="scale-125 ml-4" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => navigate("/dashboard/add-job")}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add New Job
        </button>
      </div>
    </div>
  );
};
