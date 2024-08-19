import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
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
import { Toaster } from "sonner";
import Jordan from "./pages/Jordan";
import Nike from "./pages/Nike";
import NewBalance from "./pages/NewBalance";
import Adidas from "./pages/Adidas";



export const contexts = createContext();

function App() {
  const [data, setData] = useState([]);
  const [search,setSearch] = useState('')
  return (
    <>
    <Toaster richColors position="bottom-right" />
      <contexts.Provider value={{ data, setData ,search,setSearch}}>
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
        </Routes>
      </contexts.Provider>
      <Footer/>
    </>
  );
}

export default App;
