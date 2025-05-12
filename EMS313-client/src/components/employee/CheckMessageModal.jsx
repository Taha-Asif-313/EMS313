import React from "react";

const CheckMessageModal = ({ task, onClose }) => {
    console.log(task);
    
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-[#0f0f0f] text-white p-6 rounded-lg shadow-lg w-full max-w-md text-sm">
        <h2 className="text-xl font-semibold mb-4 text-slate-100">Message & Attachment</h2>

        <div className="mb-4">
          <p className=" text-xs mb-1">Message</p>
          <p className="">{task?.submittedMessage || "No message provided."}</p>
        </div>

        <div className="mb-6">
          <p className=" text-xs mb-1">Attachment</p>
          {task?.submittedUrl ? (
            <a
              href={task.submittedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-600 hover:underline p-2 rounded break-all"
            >
              {task.submittedUrl}
            </a>
          ) : (
            <p className="">No attachment provided.</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckMessageModal;
