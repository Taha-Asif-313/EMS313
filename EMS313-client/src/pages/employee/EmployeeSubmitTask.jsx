import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const EmployeeSubmitTask = () => {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { taskId } = useParams();
  const authToken = useSelector(
    (state) => state.employee.employeeInstance.authToken
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("text", text);
      formData.append("url", url);
      if (file) formData.append("file", file);

      const res = await axios.post(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/employee/complete-task/${taskId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(res);

      toast.success("Task submitted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit task.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="h-screen p-8 bg-black flex flex-col gap-6 text-sm text-white"
    >
      <div>
        <label className="block mb-2">Task Description</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-gray-600"
          placeholder="Enter Message"
          rows="4"
        />
      </div>

      <div>
        <label className="block mb-2">Prove URL</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-gray-600"
          placeholder="https://example.com"
        />
      </div>

      {/* <div>
        <label className="block mb-2">Upload File</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full text-white"
        />
      </div> */}

      <button
        type="submit"
        className="bg-primary py-2 rounded-lg hover:bg-primary/90"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default EmployeeSubmitTask;
