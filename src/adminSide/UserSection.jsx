import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';


const UserSection = () => {
  const [users, setUsers] = useState([]);
  
  useEffect(()=>{
    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:3000/users")
      setUsers(response.data)
    }
    fetchUsers()
  },[])

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
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Username</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Cart Items</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.cart.length > 0 ? (
                          <ul className="list-disc pl-4 space-y-1">
                            {user.cart.map((item) => (
                              <li key={item.id} className="text-gray-600">
                                {item.name} (${item.price.toFixed(2)})
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-gray-500">No items</span>
                        )}
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
