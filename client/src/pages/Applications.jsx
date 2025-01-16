import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppliedJobTable, Footer, Header } from "../components";
import { AppContext } from "../context/AppContext";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "../shared";

export const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const { user } = useUser();
  const { getToken } = useAuth();

  const {
    backendUrl,
    userData,
    fetchUserData,
    userApplications,
    fetchUserApplications,
  } = useContext(AppContext);

  const updateResume = async () => {
    try {
      if (!resume) {
        toast.error("Please select a file to upload.");
        return;
      }

      const formData = new FormData();
      formData.append("resume", resume);

      const token = await getToken();

      const { data } = await axios.post(
        `${backendUrl}/api/users/update-resume`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        await fetchUserData();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsEdit(false);
      setResume(null);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserApplications();
    }
  }, [user]);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 min-h-[65vh] 2xl:px-20 my-10">
        <h2 className="sm:text-xl text-gray-600 font-semibold">Your Resume</h2>
        <div className="flex gap-2 mb-6 mt-3 ">
          {isEdit || (userData && userData.resume === "") ? (
            <>
              <label htmlFor="resumeUpload" className="flex items-center">
                <p
                  className="bg-blue-100 text-blue-600 border border-blue-400 
                  px-4 py-2 rounded-lg mr-2"
                >
                  {resume ? resume.name : "Select Resume"}
                </p>
                <input
                  type="file"
                  id="resumeUpload"
                  accept="application/pdf"
                  onChange={(e) => setResume(e.target.files[0])}
                  hidden
                />
                <img src={assets.profile_upload_icon} alt="Upload icon" />
              </label>
              <button
                className={`bg-green-100 border border-green-400 px-4 py-2 
                  rounded-lg ${resume ? "" : "opacity-50 cursor-not-allowed"}`}
                onClick={updateResume}
                disabled={!resume}
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <a
                href={userData?.resume}
                className="bg-blue-100 text-blue-600 border border-blue-400
                  px-2 py-2 rounded-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
              <button
                className="text-gray-500 border border-gray-300 rounded-lg
                 px-4 py-2"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
            </div>
          )}
        </div>
        {userApplications.length === 0 ? <Loader /> : <AppliedJobTable />}
      </div>
      <Footer />
    </>
  );
};
