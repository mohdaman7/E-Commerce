import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../../api/userIntrceptor";
import { toast } from "sonner";
import Navibar from "./Navibar";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await userApi.get("/products");
        setProducts(response?.data.data || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast.error("Failed to load products");
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (item) => {
    const isLoggedIn = !!localStorage.getItem("id");

    if (!isLoggedIn) {
      toast.warning("Please login to add items to your cart");
      navigate("/login");
    } else {
      try {
        const userId = localStorage.getItem("id"); // Retrieve user ID
        await userApi.post(`/${userId}/cart/${item.id}`); // Add product to cart
        toast.success("Item added to cart");
      } catch (error) {
        console.error("Failed to add item to cart:", error);
        toast.error("Could not add item to cart");
      }
    }
  };

  return (
    <>
    <Navibar/>
    <div className="bg-gray-100 min-h-screen py-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Explore Our Products
      </h1>
      <div className="flex flex-wrap gap-6 justify-center px-4">
        {products.map((item) => {
          return (
            <div
              key={item.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-sm relative transition-transform transform hover:scale-105"
            >
              <div className="bg-white shadow-lg rounded-lg h-full flex flex-col dark:bg-gray-800 dark:border-gray-700">
                <img
                  className="rounded-t-lg object-cover h-56 w-full cursor-pointer"
                  src={item?.img}
                  alt={item?.name}
                  onClick={() => navigate(`/detail/${item?.id}`)}
                />
                <div className="px-5 pb-5 flex flex-col flex-grow m-4">
                  <h3 className="text-gray-900 font-semibold text-lg tracking-tight dark:text-white line-clamp-2">
                    {item?.name}
                  </h3>
                  <div className="flex items-center mt-2.5 mb-3">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="bg-green-100 text-green-800 text-xs font-semibold ml-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-800">
                      5.0
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${item?.price}
                    </h3>
                    <button
                      className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
};

export default Products;
