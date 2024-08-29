import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-6 text-xl font-semibold flex items-center bg-gray-800 border-b border-gray-700">
        <span className="material-icons mr-2 text-white">dashboard</span>
        Admin Dashboard
      </div>
      <nav className="flex-1">
        <ul>
          <li className="p-4 hover:bg-gray-700 flex items-center rounded-md transition-colors">
            <span className="material-icons mr-3 text-white">home</span>
            <Link to="/dashboard" className="flex-1 text-gray-200 hover:text-white">Dashboard</Link>
          </li>
          <li className="p-4 hover:bg-gray-700 flex items-center rounded-md transition-colors">
            <span className="material-icons mr-3 text-white">store</span>
            <Link to="/products" className="flex-1 text-gray-200 hover:text-white">Products</Link>
          </li>
          <li className="p-4 hover:bg-gray-700 flex items-center rounded-md transition-colors">
            <span className="material-icons mr-3 text-white">people</span>
            <Link to="/users" className="flex-1 text-gray-200 hover:text-white">Users</Link>
          </li>
          <li className="p-4 hover:bg-gray-700 flex items-center rounded-md transition-colors">
            <span className="material-icons mr-3 text-white">shopping_cart</span>
            <Link to="/orders" className="flex-1 text-gray-200 hover:text-white">Orders</Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700 text-center bg-gray-800">
        <span className="material-icons mr-2 text-white">info</span> © 2024 Company
      </div>
    </div>
  );
};

export default Sidebar;

