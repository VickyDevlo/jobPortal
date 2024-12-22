import React from "react";
import {
  Banner,
  DownloadBanner,
  Header,
  JobListing,
  Footer,
} from "../components";

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
