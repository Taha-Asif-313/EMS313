import React from "react";

const CheckAttachmentModal = ({ task, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Attachment</h2>
        <p className="text-gray-600 mb-4">Attachment for <strong>{task?.title}</strong>:</p>
        <div className="bg-gray-100 p-4 rounded mb-4">{task?.attachment}</div>

        {/* You can add download or preview here later */}

        <div className="flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-primary text-white rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckAttachmentModal;
