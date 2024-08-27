import React from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt, FaCog } from "react-icons/fa";

const AdminNavbar = () => {
  return (
    <div className="bg-blue-800 text-white flex justify-between items-center p-4 shadow-md">
      <div className="text-xl font-semibold">Admin Dashboard</div>
      <div className="flex items-center space-x-4">
        <Link to="/settings" className="flex items-center hover:text-gray-300">
          <FaCog className="mr-1" />Settings
        </Link>
        <Link to="/logout" className="flex items-center hover:text-gray-300">
          <FaSignOutAlt className="mr-1" />Logout
        </Link>
      </div>
    </div>
  );
};

export default AdminNavbar;
