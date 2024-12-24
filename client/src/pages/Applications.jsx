import React, { useState } from "react";
import { assets } from "../assets/assets";
import { AppliedJobTable } from "../components";

export const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  return (
    <div className="container mx-auto px-4 min-h-[65vh] 2xl:px-20 my-10">
      <h2 className="text-xl font-semibold">Your Resume</h2>
      <div className="flex gap-2 mb-6 mt-3 ">
        {isEdit ? (
          <>
            <label htmlFor="resumeUpload" className="flex items-center">
              <p
                className="bg-blue-100 text-blue-600 border border-blue-400 
              px-4 py-2 rounded-lg mr-2"
              >
                Select Resume
              </p>
              <input
                type="file"
                id="resumeUpload"
                accept="application/pdf"
                onChange={(e) => setResume(e.target.files[0])}
                hidden
              />
              <img src={assets.profile_upload_icon} alt="" />
            </label>
            <button
              className="bg-green-100 border border-green-400 px-4 py-2 
              rounded-lg"
              onClick={() => setIsEdit(false)}
            >
              Save
            </button>
          </>
        ) : (
          <div className="flex gap-2">
            <a
              href=""
              className="bg-blue-100 text-blue-600 border border-blue-400
               px-2 py-2 rounded-lg"
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
      <AppliedJobTable />
    </div>
  );
};
