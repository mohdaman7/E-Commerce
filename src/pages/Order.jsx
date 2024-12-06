import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navibar from "../component/Navibar";


const Order = () => {
  const { orderId } = useParams(); // Optional orderId for filtering specific order
  const [orders, setOrders] = useState([]); // State to hold all orders
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const userId = JSON.parse(localStorage.getItem("user"))?._id; // Get the userId from localStorage
  const token = localStorage.getItem("token"); // Get the token from localStorage
  console.log(userId,"Idddddddd")
  console.log(token,"token")

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/${userId}/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          }
        );
        setOrders(response.data || []); // Set the fetched orders
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Please try again.");
        console.log(error)
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchOrders();
  }, [userId, token]);

  // Render a loading spinner while fetching data
  if (loading) {
    return (
      <div>
        <Navibar />
        <div className="flex justify-center items-center min-h-screen">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Handle case when no orders are found
  if (!orders || orders.length === 0) {
    return (
      <div>
        <Navibar />
        <div className="flex justify-center items-center min-h-screen">
          <h1>No Orders Found</h1>
        </div>
      </div>
    );
  }

  // Render the orders
  return (
    <div>
      <Navibar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-semibold mb-4">Your Orders</h1>
        <div className="space-y-6">
          {orders?.map((order) => (
            <div key={order._id} className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium mb-2">Order ID: {order.orderId}</h2>
              <p className="text-sm text-gray-600">
                Purchase Date: {new Date(order.purchaseDate).toLocaleDateString()} | 
                Payment ID: {order.paymentId}
              </p>
              <p>Delivery After-7-Days</p>
              <p className="mt-2 text-sm font-semibold">Total Price: ₹{order.totalPrice}</p>

              <h3 className="mt-4 text-md font-semibold">Products:</h3>
              <ul className="space-y-2">
                {order.productId.map((product, index) => (
                  <li
                    key={product._id || index}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.img}
                        alt={product.name || "Product"}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{product.name || "Unnamed Product"}</p>
                        <p className="text-sm text-gray-600">Brand: {product.brand}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium">₹{product.price}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
