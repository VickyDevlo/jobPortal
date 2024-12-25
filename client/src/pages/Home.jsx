import React from "react";
import { Banner, DownloadBanner, Footer, Header, JobListing } from "../components";

export const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <JobListing />
      <DownloadBanner />
      <Footer />
    </>
  );
};
