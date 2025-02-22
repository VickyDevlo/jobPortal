import React, { useContext } from "react";
import { JobCard } from "../../shared";
import { AppContext } from "../../context/AppContext";

const MoreJobSection = ({ jobData }) => {
  const { jobs, userApplications } = useContext(AppContext);

  return (
    <>
      <h2 className="text-gray-500 font-medium">
        More Jobs From
        <span className="capitalize ml-1 font-semibold text-gray-900">
          {jobData.companyId.name}
        </span>
      </h2>
      {jobs
        .filter(
          (job) =>
            job._id !== jobData._id &&
            job.companyId._id === jobData.companyId._id
        )
        .filter((job) => {
          const appliedJobsIds = new Set(
            userApplications.map((app) => app.jobId && app.jobId._id)
          );
          return !appliedJobsIds.has(job._id);
        })
        .slice(0, 4)
        .map((job, i) => (
          <JobCard key={i} job={job} />
        ))}
    </>
  );
};

export default MoreJobSection;
