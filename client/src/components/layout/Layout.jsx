import React from "react";
import { Route, Routes } from "react-router-dom";
import { Applications, ApplyJobs, Home } from "../../pages";

export const Layout = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/apply-jobs/:id" element={<ApplyJobs />} />
      <Route path="/applications" element={<Applications />} />
    </Routes>
  );
};
