import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import { InputField } from "../../shared";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmployersLogin = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(true);
  const [image, setImage] = useState(false);
  const [isTextDataSubmited, setIsTextDataSubmited] = useState(false);

  const navigate = useNavigate();

  const { setShowEmployersLogin, backendUrl, setCompanyToken, setCompanyData } =
    useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!isLoginMode && !isTextDataSubmited) {
      return setIsTextDataSubmited(true);
    }

    try {
      if (isLoginMode) {
        const { data } = await axios.post(`${backendUrl}/api/company/login`, {
          email,
          password,
        });
        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem("companyToken", data.token);
          setShowEmployersLogin(false);
          navigate("/dashboard/add-job");
          toast.success("Login Successfully...");
        } else {
          toast.error(data.message);
        }
      } else {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", image);

        const { data } = await axios.post(
          `${backendUrl}/api/company/register`,
          formData
        );
        if (data.success) {
          // setCompanyData(data.company);
          // setCompanyToken(data.token);
          // localStorage.setItem("companyToken", data.token);
          // setShowEmployersLogin(false);
          setIsLoginMode(true);
          setEmail("");
          setPassword("");
          // navigate("/dashboard/add-job");
          toast.success("Register Successfully...");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        onSubmit={onSubmitHandler}
        className="relative w-[330px] sm:w-[350px] bg-white p-8 sm:p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium mb-3">
          Employer {isLoginMode ? "Login" : "SignUp"}
        </h1>
        <p className="text-sm text-center mb-4">
          {isLoginMode
            ? "Welcome back! Please sign in to continue."
            : "Create an account to get started!"}
        </p>
        <>
          {!isLoginMode && isTextDataSubmited ? (
            <>
              <div className="flex items-center gap-4 my-10">
                <label htmlFor="image">
                  <img
                    src={
                      image ? URL.createObjectURL(image) : assets.upload_area
                    }
                    alt=""
                    className="h-14 w-14 cursor-pointer rounded-full"
                  />
                  <input
                    type="file"
                    id="image"
                    onChange={(e) => setImage(e.target.files[0])}
                    hidden
                  />
                </label>
                <p>
                  Upload Company <br /> Logo
                </p>
              </div>
            </>
          ) : (
            <div className="w-full">
              {!isLoginMode && (
                <InputField
                  icon={assets.person_icon}
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Your Name"
                  autoComplete="name"
                  required
                  className="capitalize"
                />
              )}

              <InputField
                icon={assets.email_icon}
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Your Email"
                autoComplete="email"
                required
              />
              <InputField
                icon={assets.lock_icon}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPass ? "password" : "text"}
                placeholder="Password"
                autoComplete="current-password"
                showPass={showPass}
                showPassHandler={() => setShowPass(!showPass)}
                required
              />
              {isLoginMode && (
                <p className="text-[12px] w-fit text-blue-600 mt-1 mb-4 cursor-pointer hover:underline">
                  Forgot Password
                </p>
              )}
            </div>
          )}
        </>
        <button
          type="submit"
          className={`w-full text-white py-2 rounded-md 
           bg-blue-600 transition-all mt-4`}
        >
          {isLoginMode
            ? "Login"
            : isTextDataSubmited
            ? "Create Account"
            : "Next"}
        </button>
        <p className="mt-5 text-center">
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => setIsLoginMode(!isLoginMode)}
          >
            {isLoginMode ? "SignUp" : "Login"}
          </span>
        </p>

        <img
          src={assets.cross_icon}
          width={15}
          alt="closeIcon"
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => setShowEmployersLogin(false)}
        />
      </form>
    </div>
  );
};

export default EmployersLogin;
