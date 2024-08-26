import React from 'react';
import Sidebar from './Sidebar';

const Products = () => {
  return (
    <div className="flex-1 p-6">
        <Sidebar />
      <h1 className="text-2xl font-semibold mb-6">Products</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Product List</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Example row */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">1</td>
              <td className="px-6 py-4 whitespace-nowrap">Product Name</td>
              <td className="px-6 py-4 whitespace-nowrap">Category</td>
              <td className="px-6 py-4 whitespace-nowrap">$99.99</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-blue-500 hover:text-blue-700">Edit</button>
                <button className="text-red-500 hover:text-red-700 ml-4">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
