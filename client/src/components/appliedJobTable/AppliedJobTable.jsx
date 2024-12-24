import React from "react";
import { assets, jobsApplied } from "../../assets/assets";
import moment from "moment";

const AppliedJobTable = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Job Applied</h2>
      <table className="min-w-full bg-white border rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-3  border-b text-left">Company</th>
            <th className="px-4 py-3  border-b text-left">Job Title</th>
            <th className="px-4 py-3  border-b text-left max-sm:hidden">
              Location
            </th>
            <th className="px-4 py-3  border-b text-left max-sm:hidden">
              Date
            </th>
            <th className="px-4 py-3  border-b text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {jobsApplied.map((jobApply, i) =>
            true ? (
              <tr key={i}>
                <td className="px-4 py-3 flex items-center gap-2 border-b">
                  <img src={assets.company_icon} alt="" className="w-8 h-8" />
                  {jobApply.company}
                </td>
                <td className="px-4 py-3 border-b">{jobApply.title}</td>
                <td className="px-4 py-3 border-b max-sm:hidden">
                  {jobApply.location}
                </td>
                <td className="px-4 py-3 border-b max-sm:hidden">
                  {moment(jobApply.date).format("ll")}
                </td>
                <td className="px-4 py-3 border-b">
                  <span
                    className={`${
                      jobApply.status === "Accepted"
                        ? "bg-green-100 text-green-600"
                        : jobApply.status === "Rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-600"
                    } px-4 py-2.5 rounded`}
                  >
                    {jobApply.status}
                  </span>
                </td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppliedJobTable;
