import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Checkout = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [cart, setCart] = useState([]);
  
  const uId = localStorage.getItem("id");

  const fetchCart = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${uId}`);
      setCart(response.data.cart);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTaxes = (subtotal) => {
    return subtotal * 0.1;
  };

  const calculateShipping = () => {
    return 0;
  };

  const subtotal = calculateSubtotal();
  const taxes = calculateTaxes(subtotal);
  const shipping = calculateShipping();
  const total = subtotal + taxes + shipping;

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(event.target);
    const orderData = {
      email: formData.get("email-address"),
      fullName: formData.get("full-name"),
      address: formData.get("address"),
      city: formData.get("city"),
      state: formData.get("state"),
      zipCode: formData.get("zip-code"),
      cardName: formData.get("card-name"),
      cardNumber: formData.get("card-number"),
      expirationDate: formData.get("expiration-date"),
      securityCode: formData.get("security-code"),
      items: cart,
      subtotal,
      taxes,
      shipping,
      total,
    };

    try {
      await axios.patch(`http://localhost:3000/users/${uId}`,{ order: orderData });
      toast.success("Order placed successfully!");
      setCart([]); // Clear the cart
      await axios.patch(`http://localhost:3000/users/${uId}`,{cart:[]})
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="bg-white">
      <main className="relative grid grid-cols-1 gap-x-16 max-w-7xl mx-auto lg:px-8 lg:grid-cols-2 xl:gap-x-48">
        <h1 className="sr-only">Order information</h1>

        <section
          aria-labelledby="summary-heading"
          className="bg-gray-50 pt-16 pb-10 px-4 sm:px-6 lg:px-0 lg:pb-16 lg:bg-transparent lg:row-start-1 lg:col-start-2"
        >
          <div className="max-w-lg mx-auto lg:max-w-none">
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Order summary
            </h2>

            <ul
              role="list"
              className="text-sm font-medium text-gray-900 divide-y divide-gray-200"
            >
              {cart.map((product) => (
                <li
                  key={product.id}
                  className="flex items-start py-6 space-x-4"
                >
                  <img
                    src={product.img}
                    alt={product.name}
                    className="flex-none w-20 h-20 rounded-md object-center object-cover"
                  />
                  <div className="flex-auto space-y-1">
                    <h3>{product.name}</h3>
                  </div>
                  <p className="flex-none text-base font-medium">
                    ${product.price.toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>

            <dl className="hidden text-sm font-medium text-gray-900 space-y-6 border-t border-gray-200 pt-6 lg:block">
              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Subtotal</dt>
                <dd>${subtotal.toFixed(2)}</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Shipping</dt>
                <dd>${shipping.toFixed(2)}</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Taxes</dt>
                <dd>${taxes.toFixed(2)}</dd>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <dt className="text-base">Total</dt>
                <dd className="text-base">${total.toFixed(2)}</dd>
              </div>
            </dl>

            {/* Mobile Popover */}
            <div className="fixed bottom-0 inset-x-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
              <div className="relative z-10 bg-white border-t border-gray-200 px-4 sm:px-6">
                <div className="max-w-lg mx-auto">
                  <button
                    type="button"
                    className="w-full flex items-center py-6 font-medium"
                    onClick={() => setPopoverOpen(!isPopoverOpen)}
                  >
                    <span className="text-base mr-auto">Total</span>
                    <span className="text-base mr-2">${total.toFixed(2)}</span>
                    <span
                      className={`w-5 h-5 text-gray-500 ml-2 ${
                        isPopoverOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    >
                      ▲
                    </span>
                  </button>
                </div>
              </div>

              {isPopoverOpen && (
                <div className="relative bg-white px-4 py-6 sm:px-6">
                  <dl className="max-w-lg mx-auto space-y-6">
                    <div className="flex items-center justify-between">
                      <dt className="text-gray-600">Subtotal</dt>
                      <dd>${subtotal.toFixed(2)}</dd>
                    </div>

                    <div className="flex items-center justify-between">
                      <dt className="text-gray-600">Shipping</dt>
                      <dd>${shipping.toFixed(2)}</dd>
                    </div>

                    <div className="flex items-center justify-between">
                      <dt className="text-gray-600">Taxes</dt>
                      <dd>${taxes.toFixed(2)}</dd>
                    </div>
                  </dl>
                </div>
              )}
            </div>
          </div>
        </section>

        <form
          className="pt-16 pb-36 px-4 sm:px-6 lg:pb-16 lg:px-0 lg:row-start-1 lg:col-start-1"
          onSubmit={handleSubmit}
        >
          <div className="max-w-lg mx-auto lg:max-w-none">
            <section aria-labelledby="contact-info-heading">
              <h2
                id="contact-info-heading"
                className="text-lg font-medium text-gray-900"
              >
                Contact information
              </h2>

              <div className="mt-6">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email-address"
                    name="email-address"
                    autoComplete="email"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
            </section>

            <section
              aria-labelledby="shipping-address-heading"
              className="mt-10"
            >
              <h2
                id="shipping-address-heading"
                className="text-lg font-medium text-gray-900"
              >
                Shipping address
              </h2>

              <div className="mt-6">
                <label
                  htmlFor="full-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="full-name"
                    name="full-name"
                    autoComplete="name"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    autoComplete="street-address"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="city"
                    name="city"
                    autoComplete="address-level2"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="state"
                    name="state"
                    autoComplete="address-level1"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="zip-code"
                  className="block text-sm font-medium text-gray-700"
                >
                  ZIP code
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="zip-code"
                    name="zip-code"
                    autoComplete="postal-code"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
            </section>

            <section aria-labelledby="payment-heading" className="mt-10">
              <h2
                id="payment-heading"
                className="text-lg font-medium text-gray-900"
              >
                Payment details
              </h2>

              <div className="mt-6">
                <label
                  htmlFor="card-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name on card
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="card-name"
                    name="card-name"
                    autoComplete="cc-name"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="card-number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Card number
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="card-number"
                    name="card-number"
                    autoComplete="cc-number"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="expiration-date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Expiration date (MM/YY)
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="expiration-date"
                    name="expiration-date"
                    autoComplete="cc-exp"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="security-code"
                  className="block text-sm font-medium text-gray-700"
                >
                  Security code
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="security-code"
                    name="security-code"
                    autoComplete="cc-csc"
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
            </section>

            <button
              type="submit"
              className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Pay
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Checkout;