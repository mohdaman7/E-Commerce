import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navibar from './component/Navibar'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { createContext } from 'react'

export const contexts = createContext()



function App() {
  const [data,setData] = useState([])
  return (
    <>
    <contexts.Provider value={{data,setData}}>
     <Routes>
     <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
     </Routes>
     </contexts.Provider>
    
    </>
  )
}

export default App
