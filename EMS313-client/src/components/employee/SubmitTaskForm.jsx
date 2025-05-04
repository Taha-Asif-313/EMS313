import React, { useState } from "react";

const SubmitTaskForm = () => {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ text, url, file });
    // Send data to API here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#0f0f0f] p-8 rounded-xl shadow-2xl flex flex-col gap-6 text-white"
    >
      <div>
        <label className="block mb-2">Task Description</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-gray-600"
          rows="4"
        />
      </div>

      <div>
        <label className="block mb-2">Optional URL</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-gray-600"
          placeholder="https://example.com"
        />
      </div>

      <div>
        <label className="block mb-2">Upload File</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full text-white"
        />
      </div>

      <button
        type="submit"
        className="bg-primary py-3 rounded-lg hover:bg-primary/90"
      >
        Submit
      </button>
    </form>
  );
};

export default SubmitTaskForm;
