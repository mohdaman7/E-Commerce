import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["men", "women", "kids"]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);
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
      resetForm();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/datass/${id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditProduct = async () => {
    const updatedProduct = {
      ...formData,
      price: parseFloat(formData.price),
      marketRate: parseFloat(formData.marketRate),
      quantity: parseInt(formData.quantity, 10),
      rating: parseInt(formData.rating, 10),
    };

    try {
      await axios.put(
        `http://localhost:3000/datass/${formData.id}`,
        updatedProduct
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === formData.id ? updatedProduct : product
        )
      );
      resetForm();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleSaveProduct = () => {
    if (editMode) {
      handleEditProduct();
    } else {
      handleAddProduct();
    }
  };

  const handleEditClick = (product) => {
    setFormData({
      id: product.id,
      price: product.price.toString(),
      marketRate: product.marketRate.toString(),
      img: product.img,
      name: product.name,
      brand: product.brand,
      category: product.category,
      quantity: product.quantity.toString(),
      rating: product.rating.toString()
    });
    setSelectedProduct(product);
    setEditMode(true);
  };

  const resetForm = () => {
    setFormData({
      id: '',
      price: '',
      marketRate: '',
      img: '',
      name: '',
      brand: '',
      category: '',
      quantity: '',
      rating: ''
    });
    setEditMode(false);
    setSelectedProduct(null);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Product Management</h1>

          {/* Form for adding or editing product */}
          <div className="bg-white shadow-md rounded-lg p-8 mb-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6 flex items-center">
              {editMode ? (
                <>
                  <span className="material-icons align-middle text-gray-700">edit</span>
                  <span className="ml-2">Edit Product</span>
                </>
              ) : (
                <>
                  <span className="material-icons align-middle text-gray-700">add_circle</span>
                  <span className="ml-2">Add New Product</span>
                </>
              )}
            </h2>
            <form className="space-y-6">
              {Object.keys(formData).map((key) => (
                <div className="flex flex-col" key={key}>
                  <label className="text-sm font-medium text-gray-700 mb-1 capitalize">
                    {key}
                  </label>
                  <input
                    type={key === 'price' || key === 'marketRate' || key === 'quantity' || key === 'rating' ? 'number' : 'text'}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    step={key === 'price' || key === 'marketRate' ? '0.01' : '1'}
                  />
                </div>
              ))}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleSaveProduct}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                >
                  <span className="material-icons mr-2 text-white">save</span>
                  {editMode ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center"
                >
                  <span className="material-icons mr-2 text-white">cancel</span>
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* Products Table */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <img src={product.img} alt={product.name} className="h-16 w-16 object-cover rounded-md" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="text-blue-600 hover:text-blue-700 mr-4 flex items-center"
                      >
                        <span className="material-icons mr-1">edit</span> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-700 flex items-center"
                      >
                        <span className="material-icons mr-1">delete</span> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductSection;
