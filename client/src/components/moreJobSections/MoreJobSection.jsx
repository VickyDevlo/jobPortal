import React, { useContext } from "react";
import { JobCard } from "../../shared";
import { AppContext } from "../../context/AppContext";

const MoreJobSection = ({ jobData }) => {
  const { jobs } = useContext(AppContext);
  
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
