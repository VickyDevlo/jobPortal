import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Applications, ApplyJobs, Home } from "../../pages";
import { EmployersLogin } from "../../components";
import { AppContext } from "../../context/AppContext";

export const Layout = () => {
  const { showEmployersLogin } = useContext(AppContext);

  return (
    <>
      {showEmployersLogin && <EmployersLogin />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-jobs/:id" element={<ApplyJobs />} />
        <Route path="/applications" element={<Applications />} />
      </Routes>
    </>
  );
};
