import React from "react";
import { Banner, DownloadBanner, JobListing } from "../components";

export const Home = () => {
  return (
    <>
      <Banner />
      <JobListing />
      <DownloadBanner />
    </>
  );
};
