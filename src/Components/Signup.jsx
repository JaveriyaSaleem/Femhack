import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import { MdAddTask } from "react-icons/md";

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Check if user already exists
      const responseGet = await axios.get(`https://backend-of-femhack.vercel.app/api/signup`);
      console.log(responseGet.data)
      const user = responseGet.data.find(user => user.email === data.email);

      if (user) {
        setLoading(false);
        Swal.fire({
          text: "User already exists please log in!",
        });
        navigate("/login");
        return;
      }

      // If user doesn't exist, create new user
      console.log(data)
      const responsePost = await axios.post(`https://backend-of-femhack.vercel.app/api/signup`, data);
      setLoading(false);
      
      Swal.fire({
        icon: 'success',
        title: 'Signup Successfully',
        text: 'Please enter your credentials again at login page! 💖',
      });
      console.log(responsePost.data);
      navigate("/login");
      
    } catch (e) {
      setLoading(false);
      if (e.response && e.response.status === 400) {
        alert(e.response.data.message);
        navigate("/login");
      } else {
        console.log(e);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <section className="bg-pink-50 min-h-screen relative py-6">
      <div className="flex flex-col items-center justify-center px-2 sm:px-6 py-8 mx-auto lg:py-0">
        <div className="pb-10">
        <h1 className="text-3xl sm:text-4xl text-pink-500 font-bold ">Task Board</h1>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center my-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-black"></div>
            <p className="mt-4 text-black font-semibold">Please wait... Redirecting you 🥹</p>
          </div>
        ) : (
          <div className="bg-white w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-2 md:space-y-2 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Welcome Here💖
              </h1>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 md:space-y-2">

                {/* Username */}
                <div>
                  <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-900">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="userName"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Javeriya Saleem"
                    {...register("username", {
                      required: { value: true, message: "This field is required" },
                      minLength: { value: 3, message: "Min length is 3" },
                      maxLength: { value: 8, message: "Max length is 8" }
                    })}
                  />
                  {errors.username && <div className='text-red-700'>{errors.username.message}</div>}
                </div>

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
                      minLength: { value: 5, message: "Min length is 5" },
                      maxLength: { value: 50, message: "Max length is 50" }
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
                        minLength: { value: 8, message: "Password must be at least 8 characters" },
                        pattern: {
                          value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
                          message: "Password must include 1 uppercase, 1 number, and 1 special character"
                        }
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
                  Sign Up!
                </button>

                <p className="text-sm font-light text-gray-500">
                  Already have an account?{" "}
                  <Link to='/login' className="font-medium text-primary-600 hover:underline">
                    Login here
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

export default Signup;
