import React from "react";
import { JobCard } from "../../shared";

const MoreJobSection = ({ jobData, jobs }) => {
  return (
    <>
      <h2>More Jobs from {jobData.companyId.name}</h2>
      {jobs
        .filter(
          (job) =>
            job._id !== jobData._id &&
            job.companyId._id === jobData.companyId._id
        )
        .filter((job) => true)
        .slice(0, 4)
        .map((job, i) => (
          <JobCard key={i} job={job} />
        ))}
    </>
  );
};

export default MoreJobSection;
