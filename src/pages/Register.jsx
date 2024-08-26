import React, { useEffect, useState } from "react";
// import Validation from "../Validation";
import './Register.css'
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";


function Register() {
  // const [values,setValues] = useState({
  //   name:'',
  //   email:'',
  //   password:'',
  //   cpassword:''
  // })


  // const [errors,setErrors] = useState({})

  // function handleInput(event) {
  //   const newObj = {...values,[event.target.name]: event.target.value}
  //   setValues(newObj)
  // }

  // function handleValidation(event){
  //   event.preventDefault();
  //   setErrors(Validation(values));
  // }

  const navigate = useNavigate()


  const [inputs,setInputs] = useState({
    username:'',
    email:'',
    password:'',
    cpassword:''
  })

  const [emails,setEmails] = useState([])


  const [focus,setFocus] = useState({
    errName : false,
    errEmail : false,
    errPass : false,
    errCpass : false
  })

  useEffect(()=>{
    const fetchmail = async () => {
      const response = await axios.get("http://localhost:3000/users");
      try{
        setEmails(response.data);
        console.log(emails)
      }catch(error){
        toast.error("not fetched")
      }
    }
    fetchmail()
  },[])
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs({...inputs,[name]:value,cart:[]})
  }




  const handleSubmit = async (e) => {
    e.preventDefault();
    const finduser = emails.find((user)=>user.email === inputs.email)
    
    if(finduser){
      toast.warning("User already exists")
    }else{
      await axios.post("http://localhost:3000/users",inputs)
      toast.success("Registration Successful")
      navigate('/login')
    }
    
  }
  console.log(inputs)



  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-black">FOOTZONE</h3>
          </a>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 undefined"
  
              >
                Username
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  pattern="^[A-Za-z0-9].{4,}"
                  name="username"
                  placeholder="username"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-black focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border 2px solid black"
                  onChange={handleChange}
                  value={inputs.username}
                  onBlur={()=>{
                    setFocus({...focus,errName:true})
                  }}
                  focus = {focus.errName.toString()}
                  required
                 
                />
                 <span>Username should have 3-16 characters</span>   
                {/* {errors.name && <p style={{color:"red"}}>{errors.name}</p>} */}
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                  name="email"
                  placeholder="Email ID"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border 2px solid blac"
                  onChange={handleChange}
                  value={inputs.email}
                  onBlur={()=>{
                    setFocus({...focus,errEmail:true})
                  }}
                  focus = {focus.errEmail.toString()}
                  required
                />
                 <span>Enter a valid Email ID</span>
                {/* {errors.email && <p style={{color:"red"}}>{errors.email}</p>} */}
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  name="password"
                  placeholder="password"
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border 2px solid blac"
                  onChange={handleChange}
                  value={inputs.password}
                  onBlur={()=>{
                    setFocus({...focus,errPass:true})
                  }}
                  focus = {focus.errPass.toString()}
                  required
                  
                />
                 <span>Password must have minimum 8 characters and include atleast 1 uppercase, 1 digit and 1 special character</span>
                {/* {errors.password && <p style={{color:"red"}}>{errors.password}</p>}  */}
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Confirm Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  pattern={inputs.password}
                  name="cpassword"
                  placeholder="Confirm Password"
                  // pattern={values.password}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border 2px solid blac"
                  onChange={handleChange}
                  value={inputs.cpassword}
                  onBlur={()=>{
                    setFocus({...focus,errCpass:true})
                  }}
                  focus = {focus.errCpass.toString()} 
                  required 
                />
                <span>Password is not matching</span>
                 {/* {errors.cpassword && <p style={{color:"red"}}>{errors.cpassword}</p>}  */}
              </div>
            </div>

            
            <div className="flex items-center justify-end mt-4">
              <Link 
                to='/login'
                className="text-sm text-gray-600 underline hover:text-gray-900"
                href="#"
              >
                Already registered?
              </Link>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
