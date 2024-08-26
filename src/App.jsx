import { useState } from "react";
import "./App.css";
import Navibar from "./component/Navibar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createContext } from "react";
import Latest from "./pages/Latest";
import Mens from "./pages/Mens";
import Womens from "./pages/Womens";
import Collections from "./pages/collections";
import Footer from "./component/Footer";
import Kids from "./pages/Kids";
import { toast, Toaster } from "sonner";
import Jordan from "./pages/Jordan";
import Nike from "./pages/Nike";
import NewBalance from "./pages/NewBalance";
import Adidas from "./pages/Adidas";
import Cart from "./component/Cart";
import axios from "axios";
import Contect from "./pages/contect";
import DetailProduct from "./component/DetailProduct";
import ProductSection from "./adminSide/ProductSection";
import UserSection from "./adminSide/UserSection";
import Dashboard from "./adminSide/Dashboard";
import Orders from "./adminSide/Orders";





export const contexts = createContext();

function App() {
  const [data, setData] = useState([]);
  const [search,setSearch] = useState('')
  const uId = localStorage.getItem("id")


  const addToCart = async (items) => {
   const response = await axios.get(`http://localhost:3000/users/${uId}`)
    const datass = response.data.cart
    const res = datass.find((item)=>item.id===items.id)
    console.log(res);
    if(res){
      toast.warning("Product alredy exist")
    }else{
      const updateCart = [...datass,items]
      await axios.patch(`http://localhost:3000/users/${uId}`,{cart:updateCart})
      toast.success("Product added")
    }
  };


  return (
    <>
    <Toaster richColors position="bottom-right" />
      <contexts.Provider value={{ data, setData ,search,setSearch , addToCart}}>
      <Navibar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/latest" element={<Latest />} />
          <Route path="/mens" element={<Mens />} />
          <Route path="/womens" element={<Womens />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/kids" element={<Kids/>}/>
          <Route path="/jordan" element={<Jordan/>}/>
          <Route path="/nike" element={<Nike/>}/>
          <Route path="/new-balance" element={<NewBalance/>}/>
          <Route path="/adidas" element={<Adidas/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/contact" element={<Contect/>}/>
          <Route path="/detail/:userId" element={<DetailProduct/>}/>
          <Route path="/products" element={<ProductSection/>}/>
          <Route path="/users" element={<UserSection/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/orders" element={<Orders/>}/>
        </Routes>
      </contexts.Provider>
      <Footer/>
    </>
  );
}

export default App;
