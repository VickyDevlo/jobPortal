import React from "react";
import { Banner, DownloadBanner, Header, JobListing } from "../components";

export const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <JobListing />
      <DownloadBanner />
    </>
  );
};
