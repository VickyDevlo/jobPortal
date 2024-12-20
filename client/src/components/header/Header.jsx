import React from "react";
import { assets } from "../../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <div className="shadow-md py-4">
      <div className="container mx-auto px-4 2xl:px-20 flex items-center justify-between">
        <img src={assets.logo} alt="logo" className="h-8 sm:h-8" />
        {user ? (
          <div className="ml-3 flex items-center gap-1 md:gap-2">
            <button
              onClick={() => navigate("/applications")}
              className="text-xs sm:text-base text-gray-500 whitespace-nowrap"
            >
              Applied Jobs
            </button>
            <p className="text-gray-500">|</p>
            <p className="hidden sm:block text-gray-500">
              Hi, {user.firstName}
            </p>
            <UserButton />
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 max-sm:text-sm">
            <button className="text-gray-600"> Recruiter Login</button>
            <button
              onClick={(e) => openSignIn()}
              className="text-white bg-blue-900 font-medium px-4 sm:px-9 py-2 rounded-full"
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
