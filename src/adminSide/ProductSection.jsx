import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "sonner";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/admin/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products!");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProduct = async () => {
    const { _id, ...data } = formData;

    try {
      if (editMode) {
        await axios.put(`http://localhost:3000/api/admin/products/edit/${_id}`, data);
        setProducts((prev) =>
          prev.map((product) => (product._id === _id ? { ...product, ...data } : product))
        );
        toast.success("Product updated successfully!");
      } else {
        const response = await axios.post("http://localhost:3000/api/admin/createproducts", data);
        setProducts((prev) => [...prev, response.data]);
        toast.success("Product added successfully!");
      }
      resetForm();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product!");
    }
  };

  const handleDeleteProduct = async (_id) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/products/delete/${_id}`);
      setProducts((prev) => prev.filter((product) => product._id !== _id));
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product!");
    }
  };

  const handleEditClick = (product) => {
    setFormData({ ...product });
    setEditMode(true);
    setModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      _id: "",
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
    });
    setEditMode(false);
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 space-y-8">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">Product Management</h1>

          {/* Add Product Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Add Product
            </button>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-6">Loading...</div>
            ) : (
              products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    src={product.img || "/placeholder.jpg"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-600 my-2">{product.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold text-gray-700">${product.price}</span>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Modal */}
          {modalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-lg font-semibold text-blue-600">
                    {editMode ? "Edit Product" : "Add Product"}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-red-600 focus:outline-none"
                  >
                    ✖
                  </button>
                </div>
                <div className="p-4">
                  <form className="space-y-4">
                    {["name", "description", "price", "image", "category"].map((field) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
                        <input
                          type={field === "price" ? "number" : "text"}
                          name={field}
                          value={formData[field]}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    ))}
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={handleSaveProduct}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg w-full hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="bg-gray-400 text-white px-6 py-3 rounded-lg w-full hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductSection;
