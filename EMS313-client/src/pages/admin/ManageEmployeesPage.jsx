import React, { useEffect, useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  ClipboardListIcon,
  PlusIcon,
} from "lucide-react";
import EditEmployeeModal from "../../components/admin/EditEmployeeModal";
import DeleteEmployeeModal from "../../components/admin/DeleteEmployeeModal";
import AssignTaskModal from "../../components/admin/AssignTaskModal";
import AddEmployeeModal from "../../components/admin/AddEmployeeModal";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const ManageEmployeesPage = () => {
  const authToken = useSelector((state) => state.admin.adminInstance.authToken);
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const filteredEmployees = employees.filter((emp) =>
    emp.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchEmployees = async () => {
    if (employees.length === 0) {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/admin/all-employees`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log(res);

        if (res.data.success) {
          setEmployees(res.data.allEmployees); // Assuming response has a `success` flag and `employees` array
        }
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [employees,selectedEmployee]);

  const openModal = (modalType, employee = null) => {
    setSelectedEmployee(employee);
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedEmployee(null);
    window.location.reload()
  };

  return (
    <div className="flex-1 p-8 max-h-screen overflow-y-auto max-lg:pt-24 max-lg:px-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold max-lg:text-lg">
          Manage <span className="text-primary">Employees</span>
        </h1>
        <button
          className="bg-primary text-white text-sm py-2 px-6 rounded-full flex items-center gap-2"
          onClick={() => openModal("add")}
        >
          <PlusIcon size={18} />
          Add New Employee
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search employees..."
          className="w-full p-3 rounded-lg bg-white shadow text-sm border focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Employee Table */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-6">Employee List</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-green-100 text-green-700">
                <th className="py-3 px-6 text-left font-semibold">Name</th>
                <th className="py-3 px-6 text-left font-semibold">Role</th>
                <th className="py-3 px-6 text-left font-semibold">Salary</th>
                <th className="py-3 px-6 text-left font-semibold">Payment</th>
                <th className="py-3 px-6 text-left font-semibold">Status</th>
                <th className="py-3 px-6 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => (
                  <tr key={emp._id} className="hover:bg-gray-100 transition">
                    <td className="py-4 px-6 border-b font-medium">
                      {emp.fullname}
                    </td>
                    <td className="py-4 px-6 border-b">{emp.role}</td>
                    <td className="py-4 px-6 border-b">${emp.salary}</td>
                    <td className="py-4 px-6 border-b">
                      {emp.paymentStatus ? "Paid" : "Unpaid"}
                    </td>
                    <td className="py-4 px-6 border-b">
                      {emp.isActive ? "Active" : "InActive"}
                    </td>
                    <td className="py-4 px-6 border-b flex items-center gap-3">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => openModal("edit", emp)}
                        title="Edit"
                      >
                        <PencilIcon size={18} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => openModal("delete", emp)}
                        title="Delete"
                      >
                        <TrashIcon size={18} />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-800"
                        onClick={() => openModal("assign", emp)}
                        title="Assign Task"
                      >
                        <ClipboardListIcon size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-8 text-gray-500 font-medium"
                  >
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {activeModal === "edit" && (
        <EditEmployeeModal employee={selectedEmployee} onClose={closeModal} />
      )}
      {activeModal === "delete" && (
        <DeleteEmployeeModal employee={selectedEmployee} onClose={closeModal}/>
      )}
      {activeModal === "assign" && (
        <AssignTaskModal employee={selectedEmployee} onClose={closeModal} />
      )}
      {activeModal === "add" && <AddEmployeeModal onClose={closeModal} />}
    </div>
  );
};

export default ManageEmployeesPage;
