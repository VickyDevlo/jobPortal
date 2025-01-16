import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "../shared/Loader";

export const ViewApplications = () => {
  const { backendUrl, companyToken } = useContext(AppContext);
  const [applicants, setApplicants] = useState(false);

  const fetchCompanyJobApplication = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/applicants`, {
        headers: { token: companyToken },
      });

      if (data.success) {
        setApplicants(data.applications.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/company/change-status`,
        { id, status },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        fetchCompanyJobApplication();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplication();
    }
  }, [companyToken]);

  return applicants ? (
    <div className="container mx-auto max-sm:py-5 sm:p-8">
      {applicants.length === 0 ? (
        <div className="flex items-center justify-center h-[70vh]">
          <p className="text-xl sm:text-2xl">No Applications Available!!!</p>
        </div>
      ) : (
        <div>
          <table className="w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm">
            <thead>
              <tr className="border-b text-center">
                <th className="py-2 max-sm:px-1 px-1 max-sm:text-xs sm:whitespace-nowrap max-sm:hidden">
                  Sr.No.
                </th>
                <th className="py-3 px-1 text-xs sm:text-sm whitespace-nowrap">
                  User Name
                </th>
                <th className="py-2 max-sm:px-1 px-4 max-sm:hidden">
                  Job Title
                </th>
                <th className="py-2 max-sm:px-1 px-4 max-sm:hidden">
                  Location
                </th>
                <th className="py-2 max-sm:px-1 px-1 max-sm:text-xs sm:whitespace-nowrap">
                  Resume
                </th>
                <th className="py-2 max-sm:px-1 px-1 max-sm:text-xs sm:whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="table-bg">
              {applicants
                .filter((item) => item.jobId && item.userId)
                .map((applicant, i) => (
                  <tr key={i} className="text-gray-700 text-center border-b">
                    <td className="py-2 max-sm:hidden text-center">{i + 1}</td>
                    <td>
                      <div className="flex items-center">
                        <img
                          src={applicant.userId.image}
                          alt=""
                          className="w-8 h-8 rounded-full mr-3 max-sm:hidden"
                        />
                        <span className="font-medium sm:whitespace-nowrap py-2 max-sm:px-2 px-4">
                          {applicant.userId.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 max-sm:px-2 px-4 font-medium max-sm:hidden">
                      {applicant.jobId.title}
                    </td>
                    <td className="py-2 max-sm:px-2 px-4 font-medium max-sm:hidden">
                      {applicant.jobId.location}
                    </td>
                    <td className="py-2 font-medium max-sm:px-2 px-4">
                      <a
                        href={applicant.userId.resume}
                        target="_black"
                        className="bg-blue-50 text-blue-400 max-sm:px-2 px-3 py-1 rounded inline-flex gap-2 items-center"
                      >
                        Resume
                        <img src={assets.resume_download_icon} alt="" />
                      </a>
                    </td>
                    <td className="py-2 max-sm:px-2 px-4 relative">
                      {applicant.status === "Pending" ? (
                        <div className="relative inline-block text-left group">
                          <button className="text-gray-500 action-button">
                            ...
                          </button>
                          <div className="hidden absolute z-10 right-0 left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block">
                            <button
                              onClick={() =>
                                changeJobApplicationStatus(
                                  applicant._id,
                                  "Accepted"
                                )
                              }
                              className="block w-full text-left max-sm:px-2 px-4 py-2 text-blue-500 hover:bg-gray-100"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                changeJobApplicationStatus(
                                  applicant._id,
                                  "Rejected"
                                )
                              }
                              className="block w-full text-left max-sm:px-2 px-4 py-2 text-red-500 hover:bg-gray-100"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`font-medium ${
                            applicant.status === "Accepted"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {applicant.status}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  ) : (
    <Loader />
  );
};
