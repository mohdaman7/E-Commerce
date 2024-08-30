import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';


const Orders = () => {

  const [orders,setOrders] = useState([])

  useEffect(()=>{
    const fn = async () => {
      const response = await axios.get("http://localhost:3000/users")
      const data = response.data

      const userOrders = data.users.map(user => ({
        userId: user.id,
        email: user.email,
        fullName: user.order.fullName,
        address: user.order.address,
        city: user.order.city,
        state: user.order.state,
        zipCode: user.order.zipCode,
        cardName: user.order.cardName,
        cardNumber: user.order.cardNumber,
        expirationDate: user.order.expirationDate,
        securityCode: user.order.securityCode,
        items: user.order.items,
        subtotal: user.order.subtotal,
        taxes: user.order.taxes,
        shipping: user.order.shipping,
        total: user.order.total
      }));
      setOrders(userOrders)
    }

    fn()

  },[])

  return (
    <div>
      <div>
        <AdminNavbar/>
      </div>
    <div className="flex">
        <Sidebar />
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-semibold mb-6">Orders</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Order List</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Example row */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">1001</td>
              <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
              <td className="px-6 py-4 whitespace-nowrap">$299.99</td>
              <td className="px-6 py-4 whitespace-nowrap">Shipped</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-blue-500 hover:text-blue-700">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Orders;
