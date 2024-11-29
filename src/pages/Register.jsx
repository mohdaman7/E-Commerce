import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

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
  const [profileimage, setProfile] = useState(null);
  let navigate = useNavigate();

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema: signupValidation,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      if (profileimage) {
        formData.append("image", profileimage);
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/api/users/register",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success(response.data.message, "success");
        navigate("/login");
      } catch (error) {
        toast.error(error, "error");
      }
    },
  });

  const handleImageChange = (e) => {
    setProfile(e.target.files[0]);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative "
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/pair-sneakers-with-wings-made-glowing-neon-light-sneakers-are-blue-pink-wings-are-bright-white_14117-469513.jpg')",
      }}
    >
      
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative p-8 max-w-md w-full backdrop-blur-lg bg-black bg-opacity-10 rounded-xl shadow-lg m-6">
        <form onSubmit={handleSubmit} className="w-full">
          <Card className="bg-transparent shadow-none">
            <CardHeader className="text-center">
              <div className="relative mt-6">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzS5uEf6jL79Yqu7wKePDUk_4LiX5AKax0TQ&s"
                  alt="Shoe Showcase"
                  className="w-32 h-32 mx-auto mb-3 rounded-full shadow-lg border-4 border-black"
                />
              </div>
              <Typography variant="h2" className="text-black font-bold mt-4">
                FOOTZONE
              </Typography>
              <Typography variant="small" className="text-gray-800 font-semibold">
                Discover the perfect fit and elevate your style!
              </Typography>
            </CardHeader>

            <CardBody className="space-y-4">
              <Input
                label="Username"
                size="lg"
                name="username"
                value={values.username}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.username}
                className="text-white"
              />
              {errors.username && (
                <small className="text-red-500">{errors.username}</small>
              )}
              <Input
                label="Email"
                size="lg"
                type="email"
                name="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.email}
                className="text-white"
              />
              {errors.email && (
                <small className="text-red-500">{errors.email}</small>
              )}
              <Input
                label="Password"
                size="lg"
                type="password"
                name="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.password}
                className="text-white"
              />
              {errors.password && (
                <small className="text-red-500">{errors.password}</small>
              )}
              <Input
                label="Confirm Password"
                size="lg"
                type="password"
                name="cpassword"
                value={values.cpassword}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.cpassword}
                className="text-white"
              />
              {errors.cpassword && (
                <small className="text-red-500">{errors.cpassword}</small>
              )}
              <Input
                label="Upload Profile Image"
                size="lg"
                type="file"
                name="image"
                onChange={handleImageChange}
                className="text-white"
              />
              <Checkbox
                label="I agree to the Terms and Conditions"
                className="text-gray-300"
              />
            </CardBody>
            <CardFooter className="flex flex-col gap-4">
              <Button
                variant="gradient"
                fullWidth
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600"
              >
                Sign Up
              </Button>
              <Typography className="text-center text-gray-300">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-yellow-500 font-bold hover:underline"
                >
                  Sign In
                </a>
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate(-1)}
                className="text-white border-white"
              >
                Go Back
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default Register;
