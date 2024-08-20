import React from "react";
import { useCart } from "../CartContext";

const Cart = () => {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const calculateTaxes = (subtotal) => {
        return subtotal * 0.1; 
    };

    const subtotal = calculateTotal();
    const taxes = calculateTaxes(subtotal);
    const shipping = 0; // Example shipping cost
    const total = subtotal + taxes + shipping;

    return (
        <div className="bg-gray-100 h-screen py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-3/4">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="text-left font-semibold">Product</th>
                                        <th className="text-left font-semibold">Price</th>
                                        <th className="text-left font-semibold">Quantity</th>
                                        <th className="text-left font-semibold">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="py-4 text-center">Your cart is empty.</td>
                                        </tr>
                                    ) : (
                                        cart.map((item) => (
                                            <tr key={item.id}>
                                                <td className="py-4">
                                                    <div className="flex items-center">
                                                        <img className="h-16 w-16 mr-4" src={item.img} alt={item.name} />
                                                        <span className="font-semibold">{item.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4">${item.price.toFixed(2)}</td>
                                                <td className="py-4">
                                                    <div className="flex items-center">
                                                        <button
                                                            onClick={() => decreaseQuantity(item.id)}
                                                            className="border rounded-md py-2 px-4 mr-2"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="text-center w-8">{item.quantity}</span>
                                                        <h1>{item.quantity}</h1>
                                                        <button
                                                            onClick={() => increaseQuantity(item.id)}
                                                            className="border rounded-md py-2 px-4 ml-2"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="py-4">${(item.price * item.quantity).toFixed(2)}</td>
                                                <td className="py-4">
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
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
                            <div className="flex justify-between mb-2">
                                <span className="font-semibold">Total</span>
                                <span className="font-semibold">${total.toFixed(2)}</span>
                            </div>
                            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
