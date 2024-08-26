import { data } from "autoprefixer";
import React, { useState , useEffect} from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [rvalue,setrvalue]=useState([])

  const navigate = useNavigate()

  // useEffect(()=>{
  //   const fn=async()=>{
  //     const response = await axios.get("http://localhost:3000/users")
  //     // console.log(response.data);
  //     setrvalue(response.data)
  //   //  const data = response.data
  //   // set
  
  //   }
  //  fn() 
  // },[])

  console.log(rvalue)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validate();
    const response = await axios.get("http://localhost:3000/users")
    const data = response.data.find((item)=>item.email===email && item.password===password)
    if(!data){
      toast.warning("User Invalid")
    }else{
      navigate('/')
      toast.success("Login Successful")
      localStorage.setItem("id",data.id)
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      alert("Done");
    }
    
  };


  const validate = () => {
    const error = {};

    if (!email) {
      error.email = "Email is Required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      error.email = "Email not Matched"
    } else {
      error.email = "";
    }

    if (!password) {
      error.password = "Password is Required";
    } else if (password.length < 8) {
      error.password = "Password not Matched";
    } else {
      error.password = "";
    }

    return error;
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Login</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <form onSubmit={handleSubmit}>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="email"
                        name="email"
                        type="text"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 m-4 ml-1"
                        placeholder="Email address"
                      />
                      {errors.email && (
                        <div className="text-red-500 text-sm pb-3">{errors.email}</div>
                      )}
                      <label
                        htmlFor="email"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-1 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Email Address
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="password"
                        name="password"
                        type="password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600 mt-4"
                        placeholder="Password"
                      />
                      {errors.password && (
                        <div className="text-red-500 text-sm">{errors.password}</div>
                      )}
                      <label
                        htmlFor="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-1 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm "
                      >
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      <button className="bg-blue-500 text-white rounded-md px-2 py-1 mt-5">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
