import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import userApi from "../../api/userIntrceptor";

const signupValidation = yup.object({
  username: yup.string().min(3).required("Please enter your name"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  password: yup.string().min(5).required("Please enter your password"),
  cpassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});

const initialValues = {
  username: "",
  email: "",
  password: "",
  cpassword: "",
};

const Register = () => {
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema: signupValidation,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      if (profileImage) {
        formData.append("image", profileImage);
      }

      try {
        const response = await userApi.post("/register",formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        toast.success(response.data.message);
        navigate("/login");
      } catch (error) {
        toast.error("Registration failed. Try again.");
      }
    },
  });

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-left relative"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/pair-sneakers-with-wings-made-glowing-neon-light-sneakers-are-blue-pink-wings-are-bright-white_14117-469513.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 w-96 max-w-lg p-6 bg-transparent bg-opacity-70 rounded-xl shadow-lg m-7">
        <div className="text-center mb-6">
          <img
            src="https://i.pinimg.com/736x/68/8d/61/688d612e430fde6ad82c6f07ef893fa4.jpg"
            alt="Brand Logo"
            className="w-20 h-20 mx-auto rounded-full border-4 border-black shadow-lg"
          />
          <h1 className="text-3xl font-bold text-black">Footzone</h1>
          <p className="text-sm text-gray-900">
            Discover the perfect fit and elevate your style.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-black font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={values.username}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black"
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-black font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-black font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-black font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              name="cpassword"
              value={values.cpassword}
              onBlur={handleBlur}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black"
            />
            {errors.cpassword && (
              <p className="text-sm text-red-500">{errors.cpassword}</p>
            )}
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-black font-medium">
              Profile Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full px-4 py-2"
            />
          </div>

          {/* Terms */}
          <div>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox focus:ring-black" />
              <span className="ml-2 text-black">
                I agree to the Terms and Conditions
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-gray-900 text-white font-bold rounded-lg hover:bg-black"
          >
            Sign Up
          </button>

          {/* Sign In Link */}
          <p className="text-center text-sm text-black">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-white font-bold hover:underline"
            >
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
