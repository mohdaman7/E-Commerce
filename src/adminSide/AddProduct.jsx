import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";

const AddProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [formData, setFormData] = useState({
    id: "",
    price: "",
    marketRate: "",
    img: "",
    name: "",
    brand: "",
    category: "",
    quantity: "",
    rating: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/datass");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddProduct = async () => {
    const newProduct = {
      ...formData,
      price: parseFloat(formData.price),
      marketRate: parseFloat(formData.marketRate),
      quantity: parseInt(formData.quantity, 10),
      rating: parseInt(formData.rating, 10),
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/datass",
        newProduct
      );
      const addedProduct = response.data;

      setProducts((prevProducts) => [...prevProducts, addedProduct]);
      setFormData({
        id: "",
        price: "",
        marketRate: "",
        img: "",
        name: "",
        brand: "",
        category: "",
        quantity: "",
        rating: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />

        <div className="bg-white shadow-lg rounded-lg p-8 mb-8 w-[200vh]">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Add New Product
          </h2>
          <form className="space-y-4">
            {Object.keys(formData).map((key) => (
              <div className="flex flex-col" key={key}>
                <label className="text-sm font-medium text-gray-700 mb-1">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddProduct}
              className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
