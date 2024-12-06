import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";
import { toast } from "sonner";

const UserSection = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admin/viewAllUsers");
        setUsers(response?.data?.users);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users.");
      }
    };

    fetchUsers();
  }, []);

  const handleUser = async (id, isDeleted) => {
    try {
      const endpoint = isDeleted
        ? `http://localhost:3000/api/admin/user/unblock/${id}`
        : `http://localhost:3000/api/admin/user/block/${id}`;
  
      
      const response = await axios.put(endpoint);
  
    
      toast.success(response.data.message);
  
      
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, isDeleted: !isDeleted } : user
        )
      );
    } catch (error) {
      console.error("Error updating user block status:", error);
      if (error.response) {
        toast.error(error.response.data.message || 'Failed to update user status.');
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 space-y-8">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">User Management</h1>

        
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.length > 0 ? (
              users.map((user) => (
                <div key={user._id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-300 rounded-full w-16 h-16 flex items-center justify-center text-xl text-white">
                      {user.username[0].toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{user.username}</h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <Link to={`/users/${user._id}`} className="text-blue-500 hover:underline">
                      View Details
                    </Link>
                    <button
                      onClick={() => handleUser(user._id, user.isDeleted)}
                      className={`px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 ${
                        user.isDeleted
                          ? "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500"
                          : "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500"
                      }`}
                    >
                      {user.isDeleted ? "Unblock" : "Block"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">
                No users found.
              </div>
            )}
          </div>

          {/* Footer or additional content can go here */}
        </main>
      </div>
    </div>
  );
};

export default UserSection;
