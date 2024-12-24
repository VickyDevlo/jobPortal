import React from "react";
import { assets } from "../../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <div className="shadow-md py-4">
      <div className="container mx-auto px-2 2xl:px-20 flex items-center justify-between">
        <img
          src={assets.logo}
          alt="logo"
          onClick={() => navigate("/")}
          className="h-8 sm:h-8 cursor-pointer"
        />
        {user ? (
          <div className="ml-3 flex items-center gap-1 md:gap-2">
            <button
              onClick={() => navigate("/applications")}
              className="text-xs sm:text-base text-gray-500 whitespace-nowrap"
            >
              Applied Jobs
            </button>
            <p className="text-gray-400">|</p>
            <p className="max-sm:hidden sm:block text-gray-500">
              Hi, {user.firstName}
            </p>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-1 md:gap-4 max-sm:text-sm">
            <button
              className="text-gray-600 ml-1 md:m-0 border border-red-100 px-2 
            rounded hover:bg-red-50 transition-all"
            >
              Employers
            </button>
            <button
              onClick={() => openSignIn()}
              className="text-white bg-blue-700 font-medium px-4 sm:px-4 py-2 
              rounded"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
