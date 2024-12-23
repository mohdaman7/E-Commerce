import  { useEffect, useState } from "react";
import { FaBox, FaUsers } from "react-icons/fa";
import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { toast } from "sonner";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
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
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admin/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products!");
      } 
    };
    fetchProducts()
  }, []);




  return (
    <div className="flex flex-col h-screen">
      <AdminNavbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-100">
          <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-500 text-white shadow-md rounded-lg p-6 flex items-center">
              <div className="text-3xl mr-4">
                <FaBox />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Total Products</h3>
                <p className="text-2xl font-bold">{products?.length}</p>
              </div>
            </div>
            <div className="bg-green-500 text-white shadow-md rounded-lg p-6 flex items-center">
              <div className="text-3xl mr-4">
                <FaUsers />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Total Users</h3>
                <p className="text-2xl font-bold">{users?.length}</p>
              </div>
            </div>
            {/* <div className="bg-yellow-500 text-white shadow-md rounded-lg p-6 flex items-center">
              <div className="text-3xl mr-4">
                <FaDollarSign />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Total Sales</h3>
                <p className="text-2xl font-bold ">{}</p>
              </div>
            </div> */}
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            {/* Add recent activity components or summaries here */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
