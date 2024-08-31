import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        
        console.log(response.data, 'API Response');
        
        
        const users = response.data;

        
        const allOrders = users.flatMap(user => user.order || []);

        // Set orders state
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

    fetchOrders();
  }, []);

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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.length > 0 ? (
                  orders.map((order, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{order.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{order.fullName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">${order.total?.toFixed(2) || '0.00'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.items && order.items.length > 0 ? (
                          order.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center mb-2">
                              <img src={item.img} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                              <div>
                                <p className="font-semibold">{item.name}</p>
                                <p>${item.price?.toFixed(2) || '0.00'}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>No products</p>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No orders available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
