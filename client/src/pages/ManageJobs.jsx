import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

export const ManageJobs = () => {
  const { backendUrl, companyToken } = useContext(AppContext);

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);

  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/list-jobs`, {
        headers: { token: companyToken },
      });

      if (data.success) {
        setJobs(data.jobsData.reverse());
        console.log(data.jobsData);
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
            {jobs.map((job, i) => (
              <tr key={i} className="text-center text-gray-700">
                <td className="py-2 px-4 border-b max-sm:hidden">{i + 1}</td>
                <td className="py-2 px-4 border-b">{job.title}</td>
                <td className="py-2 px-4 border-b max-sm:hidden">
                  {moment(job.date).format("ll")}
                </td>
                <td className="py-2 px-4 border-b max-sm:hidden">
                  {job.location}
                </td>
                <td className="py-2 px-4 border-b">{job.applicants}</td>
                <td className="py-2 px-4 border-b">
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
