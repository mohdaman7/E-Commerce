import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/admin/orders`);
        setOrders(response.data || []);
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
        <div className="p-8 bg-gray-100 min-h-screen flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Orders</h1>
          {orders.length === 0 ? (
            <p className="text-gray-600">No orders found.</p>
          ) : (
            <div className="space-y-6">
              {orders.map((order, index) => (
                <div key={order._id} className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4">
                    Order #{index + 1} (ID: {order.orderId})
                  </h2>
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-600 mb-2">Items:</h3>
                    <ul className="space-y-3">
                      {order.productId?.map((product) => (
                        <li key={product._id} className="flex items-start gap-4 border-b border-gray-200 pb-2">
                          <img
                            src={product.img}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-md border border-gray-300"
                          />
                          <div>
                            <p className="text-gray-700 font-medium">{product.name}</p>
                            <p className="text-gray-500">
                              ${product.price} x {product.quantity}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-600 mb-2">Total Price:</h3>
                    <p className="text-gray-700 font-semibold text-lg">${order.totalPrice}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-600 mb-2">Shipping Address:</h3>
                    <p className="text-gray-700">
                      {order.address}, {order.city}, {order.state} {order.zipcode}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
