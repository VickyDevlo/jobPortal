import React, { useContext, useEffect, useRef, useState } from "react";
import Quill from "quill";
import { JobCategories, JobLocations } from "../assets/assets";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

export const AddJobs = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner Level");
  const [salary, setSalary] = useState("");

  const { backendUrl, companyToken } = useContext(AppContext);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const description = quillRef.current.root.innerHTML;

      const { data } = await axios.post(
        `${backendUrl}/api/company/post-job`,
        { title, description, location, salary, category, level },
        { headers: { token: companyToken } }
      );

      console.log(data.message);
      
      if (data.success) {
        toast.success('Job Added Successfully...');
        setTitle("");
        setSalary("");
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <div className="flex-1 h-full">
      <form
        onSubmit={onSubmitHandler}
        className="container max-sm:p-5 sm:p-8 flex flex-col w-full items-start gap-3"
      >
        <div className="w-full">
          <p className="mb-2">Job Title</p>
          <input
            type="text"
            placeholder="Type here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded"
          />
        </div>
        <div className="w-full max-w-lg">
          <p className="my-2">Job Description</p>
          <div ref={editorRef}></div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 w-full">
          <div className="">
            <p className="mb-2">Job Category</p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="w-full
          px-3 py-2 border-2 border-gray-300 rounded"
            >
              {JobCategories.map((category, i) => (
                <option value={category} key={i}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <p className="mb-2">Job Location</p>
            <select
              onChange={(e) => setLocation(e.target.value)}
              className="w-full
          px-3 py-2 border-2 border-gray-300 rounded"
            >
              {JobLocations.map((location, i) => (
                <option value={location} key={i}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <p className="mb-2">Job Level</p>
            <select
              onChange={(e) => setLevel(e.target.value)}
              className="w-full
          px-3 py-2 border-2 border-gray-300 rounded"
            >
              <option value="Beginner Level">Beginner Level</option>
              <option value="Intermediate level">Intermediate level</option>
              <option value="Senior level">Senior level</option>
            </select>
          </div>
        </div>
        <div>
          <p>Job Salary</p>
          <input
            value={salary}
            min={0}
            onChange={(e) => setSalary(e.target.value)}
            type="number"
            placeholder="25000"
            className="w-full sm:w-[120px] px-3 py-2 border-2 border-gray-300 rounded"
          />
        </div>
        <button className="w-28 bg-black text-white p-3 mt-4 rounded">
          ADD
        </button>
      </form>
    </div>
  );
};
