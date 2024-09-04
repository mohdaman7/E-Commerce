import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';

const UserSection = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">User Management</h1>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center">
                        <span className="material-icons mr-2 text-gray-500">badge</span>
                        {user.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center">
                        <h1 className="material-icons mr-2 text-gray-500">person</h1>
                        {user.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center">
                        <span className="material-icons mr-2 text-gray-500">email</span>
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.cart.length > 0 ? (
                          <ul className="list-disc pl-4 space-y-1">
                            {user.cart.map((item) => (
                              <li key={item.id} className="flex items-center text-gray-600">
                                <h3 className="material-icons mr-2 text-gray-400">shopping_cart</h3>
                                {item.name} (${item.price.toFixed(2)})
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <h3 className="text-gray-500">No items</h3>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <Link to={`/users/${user.id}`} className="text-blue-500 hover:underline">View Details</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserSection;
