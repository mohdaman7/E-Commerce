import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Navibar from "./Navibar";
import userApi from "../../api/userIntrceptor";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const userName = JSON.parse(localStorage.getItem("user")).username;
  console.log(cart,'carttttttttttt')

  // Fetch cart items
  const fetchCart = async () => {
    try {
      const response = await userApi.get(`/${userId}/cart`);
      console.log("Cart Response Data:", response.data);
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error.response || error.message);
      toast.error(error.response?.data?.message || "Failed to fetch cart items");
    }
  };
useEffect(()=>{
 
  fetchCart()
},[])
  

  // Add or remove item from the cart
  const removeFromCart = async (productId) => {
    try {
      await userApi.delete(`/${userId}/cart/${productId}/remove`);
      toast.success("Item removed successfully");
      fetchCart(); // Refresh the cart
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item");
    }
  };

  // Increase quantity
  const increaseQuantity = async (productId) => {
    try {
      await userApi.patch(`/${userId}/cart/${productId}/increment`);
      toast.success("Quantity increased");
      fetchCart(); // Refresh the cart
    } catch (error) {
      console.error("Error increasing quantity:", error);
      toast.error("Failed to increase quantity");
    }
  };

  // Decrease quantity
  const decreaseQuantity = async (productId) => {
  console.log("anas",productId);
      try {
      await userApi.put(`/${userId}/cart/${productId}/decrement`);
      toast.success("Quantity decreased");
      fetchCart(); // Refresh the cart
    } catch (error) {
      console.error("Error decreasing quantity:", error);
      toast.error("Failed to decrease quantity");
    }
  };

  // Calculate totals
  const calculateSubtotal = () =>
    cart.reduce((total, item) => total + item.productId.price * item.quantity, 0);

  const calculateTaxes = (subtotal) => subtotal * 0.1;
  const calculateShipping = () => (cart.length > 0 ? 10 : 0);

  const subtotal = calculateSubtotal();
  const taxes = calculateTaxes(subtotal);
  const shipping = calculateShipping();
  const total = subtotal + taxes + shipping;

  const handleCheckout = async () => {
    const razorpayScript = await loadRazorpayScript();
    if (!razorpayScript) {
      toast.error("Razorpay SDK failed to load");
      return;
    }
  
    const options = {
      key: "rzp_test_lLKCq4tE7vs1RP", // Replace with your Razorpay API key
      amount: Math.round(total * 100), // Amount in the smallest currency unit (paise)
      currency: "INR",
      name: "FOOTZONE",
      description: "Purchase from FOOTZONE",
      image: "https://example.com/logo.png", // Replace with your logo URL
      handler: async function (response) {
        console.log(response);
        // On successful payment, clear the cart and navigate to the home page
        try {

          toast.success("Payment successful!").then(() => {
            navigate("/"); 
          });
        } catch (error) {
          toast.error("Failed to clear cart");
        }
      },
      prefill: {
        name: userName, // Replace with user's name
        email: "johndoe@example.com", // Replace with user's email
        contact: "9876543210", // Replace with user's contact
      },
      theme: {
        color: "#3399cc",
      },
    };
  
    const razorpay = new Razorpay(options);
    razorpay.open();
  };
  
  

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };


  return (
    <div>
      <Navibar />
      <div className="bg-gray-100 h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-4 text-center">
                          Your cart is empty.
                        </td>
                      </tr>
                    ) : (
                      cart.map((item) => (
                        <tr key={item._id}>
                          <td>
                            <div className="flex items-center">
                              <img
                                src={item.productId.image}
                                alt={item.productId.name}
                                className="h-16 w-16 mr-4"
                              />
                              <span>{item.productId.name}</span>
                            </div>
                          </td>
                          <td>${item.productId.price.toFixed(2)}</td>
                          <td>
                            <div className="flex items-center">
                              <button
                                onClick={() => decreaseQuantity(item.productId._id)}
                                className="border rounded-md py-2 px-4 mr-2"
                              >
                                -
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                onClick={() => increaseQuantity(item.productId._id)}
                                className="border rounded-md py-2 px-4 ml-2"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td>${(item.productId.price * item.quantity).toFixed(2)}</td>
                          <td>
                            <button
                              onClick={() => removeFromCart(item.productId._id)}
                              className="text-red-500 hover:text-red-700"
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
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Taxes</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
                  onClick={handleCheckout}
                >
                  Checkout
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
