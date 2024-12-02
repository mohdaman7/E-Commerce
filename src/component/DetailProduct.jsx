import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navibar from "./Navibar";
import { toast } from "sonner";
import userApi from "../../api/userIntrceptor";

const DetailProduct = () => {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const{productid}=useParams()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await userApi.get(`/products/${productid}`);
        setProduct(response?.data?.product)
        
   
       
      } catch (error) {
        console.error("Failed to fetch product details:", error);
        toast.error("Failed to load product details");
        // navigate("/"); // Redirect to home on failure
      }
    };

    fetchProduct();
  }, []);

  const handleAddToCart = async () => {
    const isLoggedIn = !!localStorage.getItem("id");

    if (!isLoggedIn) {
      toast.warning("Please login to add items to your cart");
      navigate("/login");
    } else {
      try {
        const userId = localStorage.getItem("id");
        await userApi.post(`/${userId}/cart/${product.id}`);
        toast.success("Item added to cart");
      } catch (error) {
        console.error("Failed to add item to cart:", error);
        toast.error("Could not add item to cart");
      }
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <Navibar />
      <div className="container mx-auto p-6">
        <div className="flex flex-wrap">
          {/* Product Image */}
          <div className="w-full md:w-1/2">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 p-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="mt-2 text-lg font-semibold">${product.price}</p>
            <p className="mt-4">{product.description || "No description available."}</p>
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-6"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;

