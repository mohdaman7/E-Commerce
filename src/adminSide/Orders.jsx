import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const uId = localStorage.getItem("id");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${uId}`);
        const data = response.data.order;
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [uId]);

  return (
    <div>
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-semibold mb-6">Orders</h1>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Order List</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th> */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{order.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center mb-2">
                          <img src={item.img} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                          <div>
                            <p className="font-semibold">{item.name}</p>
                            <p>${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => alert(`Order details for ${order.email}`)}
                      >
                        View
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
