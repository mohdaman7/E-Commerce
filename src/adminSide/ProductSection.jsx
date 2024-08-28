import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [formData, setFormData] = useState({
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/datass');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAddProduct = async () => {
    const newProduct = {
      ...formData,
      price: parseFloat(formData.price),
      marketRate: parseFloat(formData.marketRate),
      quantity: parseInt(formData.quantity, 10),
      rating: parseInt(formData.rating, 10)
    };

    try {
      const response = await axios.post("http://localhost:3000/datass", newProduct);
      const addedProduct = response.data;

      setProducts((prevProducts) => [...prevProducts, addedProduct]);
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

    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/datass/${id}`);
      setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Product Section</h1>

          {/* Form for adding new product */}
          {/* <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Product</h2>
            <form className="space-y-4">
              {Object.keys(formData).map((key) => (
                <div className="flex flex-col" key={key}>
                  <label className="text-sm font-medium text-gray-700 mb-1">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
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
          </div> */}

          {/* Products Table */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">IMG</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <img src={product.img} alt={product.name} className="h-12 w-12 object-cover rounded-md" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="text-blue-600 hover:text-blue-700 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Delete
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
