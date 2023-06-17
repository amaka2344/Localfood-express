'use client'
import { React, useState } from 'react'
import icon from '../../../public/icon.png'
import Image from 'next/image'
import Link from 'next/link'

function Register() {
  // input usestate
  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    password: "",
  })

  const onChangeInHandler = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = () => {
    const formData = {
      ...userDetails
    }

    //validate
    if (!formData.userName) {
      alert("Please enter a username")
    }
    if (formData.userName < 4) {
      alert('Username must be at least four characters long')
    }
    if (!formData.email) {
      alert('Email is not valid');
    }
    if (formData.password <= 5) {
      alert('Password should have more than five character.')
    }

    
  }

  // If validation passes, proceed with form submission
  return (
    <div className='text-center px-[4%] justify-center items-center md:px-[6%] pt-[10%]'>
      <div className='items-center justify-center flex pb-10'>
        <Image src={icon} alt='icon' width={100} height={100} />
      </div>
      <div>
        <h1 className='font-bold text-3xl'>
          Welcome to Local Food-Express
        </h1>
        <p className='pb-9'>
          Fill in the details to log in or create a Local Food-Express Account
        </p>
      </div>
      <form action='' className='block'>
        <input type='text'
          required
          placeholder='Username'
          name='userName'
          value={userDetails.userName}
          className='border rounded-md p-1.5 shadow-sm h-14 w-[30%] hover:border-black'
          onChange={onChangeInHandler} /> <br />
        <br />
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
            onClick={() => handleSubmit()}
            className=" bg-[#A1C75C] w-1/3 h-12 text-lg text-center">
            Register
          </button>
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline text-base"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Register