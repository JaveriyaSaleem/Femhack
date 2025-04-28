import React, { useState,useEffect } from 'react'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

const Login = () => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false) 
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Check if user already exists
      const responseGet = await axios.get(`https://backend-of-femhack-production.up.railway.app/api/signup`);
      const user = responseGet.data.find(user => user.email === data.email);
      const checkEmail = responseGet.data.find(checkEmail => checkEmail.email === data.email || checkEmail.password ==data.password);
      if (!user) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: "User not found please create an account",
        });
        navigate("/");
      } else {
        if (user.password !== data.password) {
        
                  Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: "Incorrect Credentials",
                  });
                  setLoading(false);
        } else {
          // Both email and password are correct
                 Swal.fire({
                   icon: 'success',
                   title: 'Login Successfully',
                 });
          localStorage.setItem("token", user.token);
          console.log(user.token);
          
          navigate("/dashboard");
        }}


      
    } catch (e) {
      setLoading(false);
      if (e.response && e.response.status === 400) {
        alert(e.response.data.message);
        navigate("/login");
      } else {
        console.log(e);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: "Something Went Wrong Please Try Again",
        });
      }
    }
  };

  return (
    <section className="relative py-6">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="">
          <h1 className='text-[32px] font-extrabold boldFont w-40'></h1>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center my-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-black"></div>
            <p className="mt-4 text-black font-semibold">Please wait... Redirecting you 🥹</p>
          </div>
        ) : (
          <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-2 md:space-y-2 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign in
              </h1>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 md:space-y-2">

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    {...register("email", {
                      required: { value: true, message: "This field is required" },
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address"
                      },
                    })}
                  />
                  {errors.email && <div className='text-red-700'>{errors.email.message}</div>}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                    Password
                  </label>
                  <div className="flex px-2 justify-between border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="••••••••"
                      className="text-gray-900 text-sm focus:ring-0 focus:outline-0 block w-full p-2.5"
                      {...register("password", {
                        required: { value: true, message: "Password is required" },
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="transform text-gray-600"
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                  {errors.password && <div className='text-red-700'>{errors.password.message}</div>}
                </div>

                <button
                  type="submit"
                  className="cursor-pointer w-full text-white bg-black hover:bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign in
                </button>

                <p className="text-sm font-light text-gray-500">
                  Doesn't have an account?{" "}
                  <Link to='/' className="font-medium text-primary-600 hover:underline">
                    Signup
                  </Link>
                </p>
              </form>

            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Login;
