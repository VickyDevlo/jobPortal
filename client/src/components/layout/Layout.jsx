import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import {
  AddJobs,
  Applications,
  ApplyJobs,
  Dashboard,
  Home,
  ManageJobs,
  ViewApplications,
} from "../../pages";
import { EmployersLogin } from "../../components";
import { AppContext } from "../../context/AppContext";
import "quill/dist/quill.snow.css";

export const Layout = () => {
  const { showEmployersLogin } = useContext(AppContext);

  return (
    <>
      {showEmployersLogin && <EmployersLogin />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-jobs/:id" element={<ApplyJobs />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="add-job" element={<AddJobs />} />
          <Route path="manage-job" element={<ManageJobs />} />
          <Route path="view-applications" element={<ViewApplications />} />
        </Route>
      </Routes>
    </>
  );
};
