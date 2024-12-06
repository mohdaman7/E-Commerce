import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navibar from "./Navibar";
import axios from "axios";
// import userApi from "../../api/userIntrceptor";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors

  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("user"))?._id;
  const userName = JSON.parse(localStorage.getItem("user"))?.username;
  const token = localStorage.getItem("token");


  // Fetch cart items
  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/${userId}/cart`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(response.data.data);
    } catch (err) {
      setError("Failed to fetch cart items. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Cart operations
  const updateCart = async (endpoint, method, productId) => {
    try {
      await axios({
        url: `http://localhost:3000/api/users/${userId}/cart/${productId}/${endpoint}`,
        method,
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
      toast.success("Cart updated successfully");
    } catch (err) {
      toast.error("Failed to update cart");
      console.error(err);
    }
  };

  const removeFromCart = (productId) =>
    updateCart("remove", "delete", productId);
  const increaseQuantity = (productId) =>
    updateCart("increment", "patch", productId);
  const decreaseQuantity = (productId) =>
    updateCart("decrement", "put", productId);

  // Totals calculation

  const calculateTotals = () => {
    const subtotal = cart?.reduce(
      (sum, item) => sum + item?.productId?.price * item?.quantity,
      0
    );
    const taxes = subtotal * 0.1;
    const shipping = cart.length > 0 ? 10 : 0;
    return { subtotal, taxes, shipping, total: subtotal + taxes + shipping };
  };

  const { subtotal, taxes, shipping, total } = calculateTotals();

  // Razorpay Integration
  const handleCheckout = async () => {
    const loadScript = () =>
      new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });

    const razorpayLoaded = await loadScript();
    if (!razorpayLoaded) {
      toast.error("Failed to load Razorpay SDK");
      return;
    }

    try {
      const { data } = await axios.post(
        `http://localhost:3000/api/users/payment/${userId}`,
        { amount: subtotal },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const options = {
        key: "rzp_test_lLKCq4tE7vs1RP",
        amount: data.amount,
        currency: data.currency,
        name: "Footzone",
        description: "Purchase",
        image: "/logo.png",
        order_id: data.id,
        handler: async (response) => {
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          try {
            await axios.post(
              `http://localhost:3000/api/users/verifypayment`,
              paymentData,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Payment successful!");
            setCart([]);
            navigate("/");
          } catch (err) {
            toast.error("Payment verification failed");
            console.error(err);
          }
        },
        prefill: {
          name: userName,
          email: "user@example.com",
          contact: "1234567890",
        },
        theme: { color: "#3399cc" },
      };

      const razorpay = new Razorpay(options);
      razorpay.open();
    } catch (err) {
      toast.error("Checkout failed");
      console.error(err);
    }
  };

  return (
    <div>
      <Navibar />
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Cart Items Section */}
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="5" className="text-center py-4">
                          Loading...
                        </td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td colSpan="5" className="text-center py-4">
                          {error}{" "}
                          <button
                            onClick={fetchCart}
                            className="text-blue-500 underline"
                          >
                            Retry
                          </button>
                        </td>
                      </tr>
                    ) : cart.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-4">
                          Your cart is empty.
                        </td>
                      </tr>
                    ) : (
                      cart.map((item) => (
                        <tr key={item._id}>
                          <td>
                            <div className="flex items-center">
                              <img
                                src={item?.productId?.img}
                                alt={item?.productId?.name}
                                className="h-16 w-16 mr-4"
                              />
                              <span>{item?.productId?.title}</span>
                            </div>
                          </td>
                          <td>${item?.productId?.price}</td>
                          <td>
                            <div className="flex items-center">
                              <button
                                onClick={() =>
                                  decreaseQuantity(item?.productId?._id)
                                }
                                className="px-2"
                              >
                                -
                              </button>
                              <span>{item?.quantity}</span>
                              <button
                                onClick={() =>
                                  increaseQuantity(item?.productId?._id)
                                }
                                className="px-2"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td>${item?.productId?.price * item?.quantity}</td>
                          <td>
                            <button
                              onClick={() => removeFromCart(item?.productId?._id)}
                              className="text-red-500"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Section */}
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                <div>
                  <p>Subtotal: ${subtotal.toFixed(2)}</p>
                  <p>Taxes: ${taxes.toFixed(2)}</p>
                  <p>Shipping: ${shipping.toFixed(2)}</p>
                  <hr />
                  <p>Total: ${total.toFixed(2)}</p>
                </div>
                <button
                  onClick={handleCheckout}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full mt-4"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
