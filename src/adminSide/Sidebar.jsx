import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-6 text-xl font-semibold">Admin Dashboard</div>
      <nav className="flex-1">
        <ul>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/products">Products</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/addproduct">Add Product</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/orders">Orders</Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-600 text-center">© 2024 Company</div>
    </div>
  );
};

export default Sidebar;
