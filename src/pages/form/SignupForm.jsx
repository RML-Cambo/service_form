import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../auth/authAction"; // Correct path
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo1 from "../../assets/img/LogoCP1.png";
export default function SignUpForm() {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .matches(
        regex,
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  // Handle Register
  const handleRegister = async (values) => {
    const registerData = await register(values);
    registerData?.status
      ? toast.error(registerData.message)
      : toast.success(registerData.message);
    console.log("RegisterData", registerData);
  };

  return (
    <>
      <section className="flex justify-center my-0 py-   p-5  ">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            handleRegister(values);
            resetForm();
          }}
        >
          <Form className="w-1/2  py-10  rounded-md">
            <h1 className="text-3xl font-semibold text-center text-semiBlue-600">
              Create an account
            </h1>
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-semiBlue-600 font-semibold underline underline-offset-1"
                >
                  Log in
                </Link>
              </p>
            </div>
            {/* Username */}
            <div className="mt-5">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                What should we call you?
              </label>
              <Field
                type="text"
                name="username"
                id="username"
                className="bg-gray-50 border border-grey-300 text-grey-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your profile name"
              />
              <ErrorMessage
                name="username"
                className="text-primary-600"
                component="div"
              />
            </div>

            {/* Email */}
            <div className="mt-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                What is your Email?
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-grey-300 text-grey-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your email address"
              />
              <ErrorMessage
                name="email"
                className="text-primary-600"
                component="div"
              />
            </div>

            {/* Password */}
            <div className="mt-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Create a password
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                className="bg-gray-50 border border-grey-300 text-grey-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Password"
              />
              <ErrorMessage
                name="password"
                className="text-primary-600"
                component="div"
              />
            </div>

            {/* Confirm Password */}
            <div className="mt-5">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm your password
              </label>
              <Field
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="bg-gray-50 border border-grey-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Confirm Password"
              />
              <ErrorMessage
                name="confirmPassword"
                className="text-primary-600"
                component="div"
              />
            </div>
            <div className="flex justify-center m-5">
              <button class="cursor-pointer  text-white font-bold relative text-[14px] w-full h-[3em] text-center bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% bg-[length:400%] rounded-[30px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-violet-500 before:from-10% before:via-sky-500 before:via-30% before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-violet-700 focus:ring-violet-700">
                Sign Up
              </button>
            </div>

            {/* Social Media Buttons */}
            <div className="mt-2">
              <div className="flex items-center">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-2 text-gray-600">Or continue with</span>
                <hr className="flex-grow border-gray-300" />
              </div>

              <div className="flex flex-col space-y-2 mt-3">
                {/* Continue with Google */}
                <button className="border text-black border-grey-500  rounded-2xl  py-2 flex items-center justify-center hover:bg-grey-100 transition">
                  <div className="flex ">
                    <span className="mr-2">
                      <img
                        className="w-8 ml-1 h-8 object-cover rounded-l-lg"
                        src="/src/assets/login/google.png"
                        alt="Google"
                      />
                    </span>
                    <p>Continue with Google</p>
                  </div>
                </button>

                {/* Continue with Facebook */}
                <button className="border text-black border-grey-500 rounded-2xl  py-2 flex items-center justify-center hover:bg-grey-100 transition">
                  <div className="flex">
                    <span className="ml-6">
                      <img
                        className="w-7 h-7 object-cover rounded-l-lg"
                        src="/src/assets/login/fb.png"
                        alt="Facebook"
                      />
                    </span>
                    <p className="ml-2">Continue with Facebook</p>
                  </div>
                </button>
                {/* Continue with Apple */}
                <button className="border text-black border-grey-500  rounded-2xl  py-2 flex items-center justify-center hover:bg-grey-100 transition">
                  <div className="flex">
                    <span className="mr-2">
                      <img
                        className="w-8 h-8 object-cover rounded-l-lg"
                        src="/src/assets/login/apple.png"
                        alt="Apple"
                      />
                    </span>
                    <p className="">Continue with Apple</p>
                  </div>
                </button>
              </div>
            </div>
            {/* easyfound */}
            <div className=" mt-10 flex items-center">
              <Link to="/">
                <img src={Logo1} alt="" className="w-16 h-16" />
              </Link>
              <span className="font-pacifico"> Easy Found</span>
            </div>

            <ToastContainer />
          </Form>
        </Formik>
      </section>
    </>
  );
}
