import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';

const UserDetails = () => {
  const {userId} = useParams();
  const [user,setUser] = useState(null)

  useEffect(()=>{
    const fn = async () => {
        const response = await axios.get(`http://localhost:3000/users/${userId}`);
        setUser(response.data)
    }
    fn()
    },[userId])

    if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">User Details</h1>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User ID: {user.id}</h2>
            <p className="text-lg text-gray-700 mb-2"><strong>Username:</strong> {user.username}</p>
            <p className="text-lg text-gray-700 mb-2"><strong>Email:</strong> {user.email}</p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6">Cart Items:</h3>
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
              <p className="text-gray-500">No items in cart.</p>
            )}
            <h3 className="text-xl font-semibold text-gray-800 mt-6">Orders:</h3>
            {user.order.length > 0 ? (
              <ul className="list-disc pl-4 space-y-1">
                {user.order.map((order, index) => (
                  <li key={index} className="text-gray-600">
                    <p><strong>Order #{index + 1}:</strong></p>
                    <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                    <p><strong>Items:</strong></p>
                    <ul className="list-disc pl-4">
                      {order.items.map((item) => (
                        <li key={item.id} className="text-gray-600">
                          {item.name} (${item.price.toFixed(2)})
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No orders placed.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDetails;
