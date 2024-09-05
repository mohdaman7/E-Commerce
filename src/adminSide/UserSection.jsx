import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';
import { toast } from 'sonner';

const UserSection = () => {
  const [users, setUsers] = useState([]);
  const [blockUsers, setBlockUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  const handleUser = async (id) => {
    const response = await axios.get(`http://localhost:3000/users/${id}`);
    const blocks = response.data.block;
    setBlockUsers(response.data.block);
    try {
      if (blocks === true && response.data.admin === true) {
        toast.warning("This is a pro admin");
      } else if (blocks === true) {
        await axios.patch(`http://localhost:3000/users/${id}`, {
          block: false,
        });
        toast.success("User unblocked");
        // Update users state to reflect changes
        setUsers(users.map(user => 
          user.id === id ? { ...user, blocked: false } : user
        ));
      } else {
        await axios.patch(`http://localhost:3000/users/${id}`, {
          block: true,
        });
        toast.warning("User blocked");
        // Update users state to reflect changes
        setUsers(users.map(user => 
          user.id === id ? { ...user, blocked: true } : user
        ));
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center">
                        <Link to={`/users/${user.id}`} className="text-blue-500 hover:underline mr-4">View Details</Link>
                        <button
                          onClick={() => handleUser(user.id)}
                          className={`px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 ${user.blocked ? 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500' : 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500'}`}
                        >
                          {user.blocked ? 'Unblock' : 'Block'}
                        </button>
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
