import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fn = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        const users = response.data;
        const allOrders = users.flatMap(user => user.order || []);

        if (Array.isArray(allOrders)) {
          setOrders(allOrders);
        } else {
          console.error("Fetched data is not an array:", allOrders);
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fn();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <AdminNavbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-100">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Orders</h1>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <h2 className="text-2xl font-semibold border-b border-gray-200 px-6 py-4 bg-gray-50">Order List</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.length > 0 ? (
                  orders.map((order, index) => (
                    <tr key={index}>
                      <td className="px-4 py-4 whitespace-nowrap text-gray-800">{order.email}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-gray-800">{order.fullName}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-gray-800">${order.total?.toFixed(2) || '0.00'}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {order.items && order.items.length > 0 ? (
                          <div className="space-y-2">
                            {order.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="flex items-center space-x-4">
                                <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-md shadow-sm" />
                                <div>
                                  <p className="font-semibold text-gray-900">{item.name}</p>
                                  <p className="text-gray-600">${item.price?.toFixed(2) || '0.00'}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500">No products</p>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-4 py-4 text-center text-gray-500">No orders available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Orders;
