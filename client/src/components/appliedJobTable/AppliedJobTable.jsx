import React, { useContext } from "react";
import moment from "moment";
import { AppContext } from "../../context/AppContext";

const AppliedJobTable = () => {
  const { userApplications } = useContext(AppContext);

  return (
    <div>
      <h2 className="sm:text-xl font-semibold mb-4 text-gray-600">
        Job Applied
      </h2>

      <table className="min-w-full bg-white border rounded-lg">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-1 text-xs sm:text-sm whitespace-nowrap">
              Company
            </th>
            <th className="py-2 px-1 text-xs sm:text-sm whitespace-nowrap">
              Job Title
            </th>
            <th className="py-2 px-1 text-xs sm:text-sm whitespace-nowrap hidden sm:table-cell">
              Location
            </th>
            <th className="py-2 px-1 text-xs sm:text-sm whitespace-nowrap hidden sm:table-cell">
              Date
            </th>
            <th className="py-2 px-1 text-xs sm:text-sm whitespace-nowrap">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {userApplications.map((jobApply, i) => (
            <tr key={i} className="border-b text-center">
              <td className="px-2 py-3 capitalize flex items-center gap-3 justify-center">
                <img
                  src={jobApply.companyId.image}
                  alt={`${jobApply.companyId.name} Logo`}
                  className="w-5 h-5 hidden sm:inline-block mb-2"
                />
                <span className="font-medium text-sm sm:text-base">
                  {jobApply.companyId.name}
                </span>
              </td>

              <td className="py-2 px-2 text-center text-sm sm:text-base font-medium">
                {jobApply.jobId.title}
              </td>

              <td className="px-4 py-3 hidden sm:table-cell">
                {jobApply.jobId.location}
              </td>

              <td className="px-4 py-3 hidden sm:table-cell">
                {moment(jobApply.date).format("ll")}
              </td>

              <td className="py-2 px-2 text-sm">
                <span
                  className={`px-3 py-1 rounded text-xs sm:text-sm font-medium ${
                    jobApply.status === "Accepted"
                      ? "bg-green-100 text-green-600"
                      : jobApply.status === "Rejected"
                      ? "bg-red-100 text-red-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {jobApply.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppliedJobTable;
