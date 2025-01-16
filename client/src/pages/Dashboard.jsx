import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

export const Dashboard = () => {
  const navigate = useNavigate();

  const { companyData, setCompanyData, setCompanyToken } =
    useContext(AppContext);

  const logout = () => {
    setCompanyToken(null);
    localStorage.removeItem("companyToken");
    setCompanyData(null);
    navigate("/");
    toast.error("Logout Successfully...");
  };

  useEffect(() => {
    if (companyData) {
      navigate("/dashboard/view-applications");
    }
  }, [companyData]);

  return (
    <div className="min-h-screen">
      <div className="shadow-md py-4">
        <div className="container mx-auto px-2 2xl:px-20 flex items-center justify-between">
          <img
            src={assets.logo}
            alt=""
            className="h-8 sm:h-8 cursor-pointer"
            onClick={() => navigate("/")}
          />
          {companyData && (
            <div className="flex items-center gap-4 mr-2">
              <p className="max-sm:hidden text-gray-800 font-semibold">
                Welcome, &nbsp;
                <span className="text-gray-600 capitalize">
                  {companyData.name}
                </span>
              </p>
              <div className="relative group">
                <img
                  src={companyData.image}
                  alt=""
                  className="h-7 w-7 object-contain"
                />
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
                  <ul className="list-none m-0 p-2 bg-white rounded border text-sm">
                    <li
                      className="py-1 px-2 cursor-pointer pr-10"
                      onClick={logout}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-start">
        <div className="inline-block min-h-screen border-r-2 md:w-52 sticky top-0">
          <ul className="flex flex-col items-start pt-5 text-gray-800">
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 
          ${isActive && "bg-blue-100 border-r-4 border-blue-400"}`
              }
              to={"/dashboard/add-job"}
            >
              <img className="min-w-4" src={assets.add_icon} alt="" />
              <p className="max-sm:hidden">Add Jobs</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 
          ${isActive && "bg-blue-100 border-r-4 border-blue-400"}`
              }
              to={"/dashboard/manage-job"}
            >
              <img className="min-w-4" src={assets.home_icon} alt="" />
              <p className="max-sm:hidden">Manage Jobs</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 
          ${isActive && "bg-blue-100 border-r-4 border-blue-400"}`
              }
              to={"/dashboard/view-applications"}
            >
              <img className="min-w-4" src={assets.person_tick_icon} alt="" />
              <p className="max-sm:hidden whitespace-nowrap">View Applications</p>
            </NavLink>
          </ul>
        </div>
        <div className="flex-1 h-full p-1 sm:p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
