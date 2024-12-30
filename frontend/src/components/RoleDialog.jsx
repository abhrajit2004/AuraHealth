import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const RoleDialog = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const userRoleData = JSON.parse(localStorage.getItem("userRole"));

    if ((!userRoleData || userRoleData.userId !== user?.id) && user) {
      setShowDialog(true);
    }
  }, []);

  const handleRoleSelect = (role) => {
    const roleData = {
      role: role,
      userId: user.id,
    };

    localStorage.setItem("userRole", JSON.stringify(roleData));
    setSelectedRole(role);
    setShowDialog(false);
    toast.loading("Role selected successfully! Reloading...");

    setTimeout(() => {
      window.location.reload();
    }, 900);

  };

  if (!showDialog) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Select Your Role
        </h2>
        <div className="space-y-4">
          <button
            onClick={() => handleRoleSelect("patient")}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
              selectedRole === "patient"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-500"
            }`}
          >
            <div className="font-semibold text-lg">Patient</div>
            <p className="text-gray-600 text-sm">
              I want to consult with doctors and manage my health
            </p>
          </button>

          <button
            onClick={() => handleRoleSelect("doctor")}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
              selectedRole === "doctor"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-500"
            }`}
          >
            <div className="font-semibold text-lg">Doctor</div>
            <p className="text-gray-600 text-sm">
              I want to provide consultations and treat patients
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleDialog;
