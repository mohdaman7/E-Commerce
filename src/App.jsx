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

export const contexts = createContext();

function App() {
  const [data, setData] = useState([]);
  return (
    <>
    <Navibar/>
      <contexts.Provider value={{ data, setData }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/latest" element={<Latest />} />
          <Route path="/mens" element={<Mens />} />
          <Route path="/womens" element={<Womens />} />
          <Route path="/collections" element={<Collections />} />
        </Routes>
      </contexts.Provider>
      <Footer/>
    </>
  );
}

export default App;
