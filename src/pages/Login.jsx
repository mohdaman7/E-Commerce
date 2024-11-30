import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { RiAdminFill } from "react-icons/ri";

const signupValidation = yup.object({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().min(5, "Password must be at least 5 characters").required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema: signupValidation,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:3000/api/users/login", {
          email: values.email,
          password: values.password,
        });

        if (response.status === 200) {
          const { token, user } = response.data;

          localStorage.setItem("tocken", token);
          localStorage.setItem("user", JSON.stringify(user));

          toast.success("Login successful!");
          navigate("/");
        }
      } catch (error) {
        toast.error("Invalid email or password");
        console.error(error);
      }
    },
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative text-white"
      style={{
        backgroundImage:
          "url('https://dailycoin.com/wp-content/uploads/2022/01/Nike-Tries-on-NFTs-After-Acquiring-a-Virtual-Footwear-Maker_1600X630px_web-copy.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md p-8 bg-transparent bg-opacity-90 rounded-xl shadow-lg"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold uppercase">Sign In</h1>
          <p className="text-gray-400">Access your account to start shopping!</p>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-semibold mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />
          {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
        </div>

       
        <div className="flex items-center mb-6">
          <input type="checkbox" id="remember" className="form-checkbox text-gray-300" />
          <label htmlFor="remember" className="ml-2 text-sm text-gray-400">
            Remember Me
          </label>
        </div>

        
        <button
          type="submit"
          className="w-full py-2 bg-white text-black font-bold uppercase rounded-lg hover:bg-gray-200 transition"
        >
          <p>Sign In</p>
        </button>

        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            <p>Dont have an account?{" "}</p>
            <span
              onClick={() => navigate("/register")}
              className="text-white font-bold cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
          <p className="mt-4">
            <Link to="/adminlogin" className="flex items-center justify-center text-gray-400 hover:text-white">
              <RiAdminFill size={20} className="mr-2" /> Admin Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
