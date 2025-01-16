import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { Loader } from "../shared";

export const ManageJobs = () => {
  const { backendUrl, companyToken } = useContext(AppContext);

  const navigate = useNavigate();

  const [jobs, setJobs] = useState(false);

  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/list-jobs`, {
        headers: { token: companyToken },
      });

      if (data.success) {
        setJobs(data.jobsData.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeJobVisibility = async (id) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/company/change-visibility`,
        { id },
        { headers: { token: companyToken } }
      );
      if (data.success) {
        toast.success(data.message);
        fetchCompanyJobs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
    }
  }, [companyToken]);

  return jobs ? (
    <div className="container mx-auto max-w-5xl max-sm:py-5 sm:p-8">
      {jobs.length === 0 ? (
        <div className="flex items-center justify-center h-[70vh]">
          <p className="text-xl sm:text-2xl">No Jobs Available or Posted!!!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table
            className="min-w-full bg-white max-sm:text-sm border 
            border-gray-200"
          >
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 max-sm:hidden">Sr.No.</th>
                <th className="py-2 px-1 max-sm:text-xs">Job Title</th>
                <th className="py-2 px-4 max-sm:hidden">Date</th>
                <th className="py-2 px-4 max-sm:hidden">Location</th>
                <th className="py-2 px-1 max-sm:text-xs">Applicants</th>
                <th className="py-2 px-1 max-sm:text-xs">Visible</th>
              </tr>
            </thead>
            <tbody className="table-bg">
              {jobs.map((job, i) => (
                <tr key={i} className="text-center text-gray-700 border-b">
                  <td className="py-2 max-sm:px-2 px-4 font-medium max-sm:hidden">
                    {i + 1}
                  </td>
                  <td className="py-2 max-sm:px-2 px-4 font-medium">
                    {job.title}
                  </td>
                  <td className="py-2 max-sm:px-2 px-4 font-medium max-sm:hidden">
                    {moment(job.date).format("ll")}
                  </td>
                  <td className="py-2 max-sm:px-2 px-4 font-medium max-sm:hidden">
                    {job.location}
                  </td>
                  <td className="py-2 max-sm:px-2 px-4 font-medium">
                    {job.applicants}
                  </td>
                  <td className="py-2 max-sm:px-2 px-4 font-medium">
                    <input
                      type="checkbox"
                      onChange={() => changeJobVisibility(job._id)}
                      checked={job.visible}
                      className="scale-125 ml-4"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => navigate("/dashboard/add-job")}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add New Job
        </button>
      </div>
    </div>
  ) : (
    <Loader />
  );
};
