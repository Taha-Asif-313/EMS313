import React, { useState } from "react";
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

const ManageEmployeesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState(null); // 'edit' | 'delete' | 'assign' | 'add'
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const employees = [
    { id: 1, name: "John Doe", role: "Manager", salary: "$5,000" },
    { id: 2, name: "Jane Smith", role: "Developer", salary: "$4,500" },
    { id: 3, name: "Sara Wilson", role: "Designer", salary: "$4,000" },
    { id: 4, name: "Michael Brown", role: "QA Engineer", salary: "$4,200" },
    { id: 5, name: "Emily Davis", role: "HR", salary: "$3,800" },
  ];

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (modalType, employee = null) => {
    setSelectedEmployee(employee);
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedEmployee(null);
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
                <th className="py-3 px-6 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="hover:bg-gray-100 transition"
                  >
                    <td className="py-4 px-6 border-b font-medium">
                      {employee.name}
                    </td>
                    <td className="py-4 px-6 border-b">{employee.role}</td>
                    <td className="py-4 px-6 border-b">{employee.salary}</td>
                    <td className="py-4 px-6 border-b">
                      <div className="flex gap-3">
                        <button
                          onClick={() => openModal("edit", employee)}
                          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                        >
                          <PencilIcon size={12} />
                        </button>
                        <button
                          onClick={() => openModal("delete", employee)}
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full"
                        >
                          <TrashIcon size={12} />
                        </button>
                        <button
                          onClick={() => openModal("assign", employee)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full"
                        >
                          <ClipboardListIcon size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
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
        <DeleteEmployeeModal employee={selectedEmployee} onClose={closeModal} />
      )}
      {activeModal === "assign" && (
        <AssignTaskModal employee={selectedEmployee} onClose={closeModal} />
      )}
      {activeModal === "add" && <AddEmployeeModal onClose={closeModal} />}
    </div>
  );
};

export default ManageEmployeesPage;
