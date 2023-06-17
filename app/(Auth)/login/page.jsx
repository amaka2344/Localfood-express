"use client";
import { React, useState } from "react";
import icon from "../../../public/icon.png";
import Image from "next/image";
import Link from "next/link";
//import services
import { login } from "../../../services/user";

function Login() {
  // input usestate
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onChangeInHandler = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,

    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      ...userDetails
    }

    //validate
    if (!formData.email) {
      alert('Email is not valid');
      return;
    }
    if (!formData.password.length <= 5) {
      alert('Password should have more than five character.')
      return;
    }

    try {
      setLoading(true);
      const response = await login(userDetails);
      setLoading(false);
      if (response.hasOwnProperty("success") && response.success) {
        //use toast library here
        alert("Login successful");
        alert(JSON.stringify(response.userData));
        // save response.user into local storage (easier) or a redux persited state
        // navigate user to dashboard page
      }
    } catch (error) {
      //use toast library here
      alert(error);
    }
  }

// If validation passes, proceed with form submission
return (
  <div className='text-center px-[4%] justify-center items-center md:px-[6%] pt-[10%]'>
    <div className='items-center justify-center flex pb-10'>
      <Image src={icon} alt='icon' width={100} height={100} />
    </div>
    <div>
      <h1 className=' font-bold text-3xl'>
        Welcome to Local Food-Express
      </h1>
      <p className='pb-9'>
        Fill in the details to log in or create a Local Food-Express Account
      </p>
    </div>
    <form action='' className='block' onSubmit={handleSubmit}>
      <input type='email'
        required
        placeholder='email'
        value={userDetails.email}
        name='email'
        className='border rounded-md p-1.5 shadow-sm h-14 w-[30%] hover:border-black'
        onChange={onChangeInHandler} /> <br />
      <br />
      <input type='password'
        required
        placeholder='password'
        value={userDetails.password}
        name='password'
        className='border rounded-md p-1.5 shadow-sm h-14 w-[30%] hover:border-black '
        onChange={onChangeInHandler} />

      <div className="w-full py-10 flex flex-col gap-4 items-center">
        <button
          type="submit"
          className=" bg-[#A1C75C] w-1/3 h-12 text-lg text-center"
        >
          Log In
        </button>
        <p className="text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="underline text-base
            "
          >
            Register
          </Link>
        </p>
      </div>
    </form>
  </div>
)
}

export default Login;
