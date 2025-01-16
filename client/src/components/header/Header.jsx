import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Header = () => {
  const navigate = useNavigate();
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const { setShowEmployersLogin, companyToken, companyData } =
    useContext(AppContext);

  return (
    <div className="shadow-md py-4">
      <div className="container mx-auto px-2 2xl:px-20 flex items-center justify-between">
        <img
          src={assets.logo}
          alt="logo"
          onClick={() => navigate("/")}
          className="h-6 sm:h-8 object-contain cursor-pointer"
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
              className={`text-gray-600 font-bold ml-1 md:m-0 px-2
                ${
                  companyToken &&
                  "border-none font-bold capitalize hover:bg-transparent"
                }`}
              onClick={() => {
                companyToken
                  ? navigate("/dashboard")
                  : setShowEmployersLogin(true);
              }}
            >
              {companyToken
                ? companyData && (
                    <div className="flex items-center gap-4">
                      <p className="max-sm:hidden text-gray-800 font-semibold">
                        Welcome, &nbsp;
                        <span className="text-gray-600 capitalize">
                          {companyData.name}
                        </span>
                      </p>
                      <img
                        src={companyData.image}
                        alt=""
                        className="h-7 w-7 object-contain"
                      />
                    </div>
                  )
                : "EMPLOYERS"}
            </button>
            <button
              onClick={() => openSignIn()}
              className={`${
                companyToken && "hidden"
              } text-white bg-blue-900 font-medium px-4 sm:px-4 py-1 
              rounded`}
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
