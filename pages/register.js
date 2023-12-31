import { React, useState } from "react";
import icon from "../public/icon.png";
import Image from "next/image";
import Link from "next/link";
import NavBar from "../components/NavBar";
import Footer from '../components/Footer'
//import use router
import { useRouter } from 'next/router';
//import toast
import toast, { Toaster } from 'react-hot-toast';
//import services
import { register } from "../services/user";
//import loader
import ClipLoader from "react-spinners/ClipLoader";

const Register = () => {
  //input use router
  const router = useRouter()

  // input usestate
  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onChangeInHandler = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      ...userDetails,
    };

    //validate
    if (!formData.userName) {
      return toast.error('please enter a username')

    }
    if (formData.userName.length < 4) {
      return toast.error('Username must be at least four characters long')
    }
    if (!formData.email) {
      return toast.error('Email is not valid')
    }
    if (formData.password.length <= 5) {
      return toast.error('Password should have more than five character.')
    }

    setIsLoading(true);

    try {
      const response = await register(formData);
      setIsLoading(false);
      if (response.hasOwnProperty("success") && response.success) {
        setUserDetails({
          userName: "",
          email: "",
          password: "",
        });
        //use toast library here
        toast.success('Registration Successful')
        // navigate user to login page
        router.push('/login')
      }
    } catch (error) {
      setIsLoading(false)
      //use toast library here
      toast.error('error')
    }
  };

  // If validation passes, proceed with form submission
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow text-center px-[4%] justify-center items-center md:px-[6%] pt-[10%] text-black">
        <div className="items-center justify-center flex pb-10">
          <Image src={icon} alt="icon" width={100} height={70} />
        </div>
        <div>
          <h1 className="font-bold text-black text-3xl">Welcome to Local Food-Express</h1>
          <p className="pb-9 text-gray-400">
            Fill in the details to log in or create a Local Food-Express Account
          </p>
        </div>
        <form action="" className="block" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            placeholder="Username"
            name="userName"
            value={userDetails.userName}
            className="border rounded-md p-1.5 shadow-sm h-14 w-[30%] hover:border-black"
            onChange={onChangeInHandler}
          />{" "}
          <br />
          <br />
          <input
            type="email"
            required
            placeholder="email"
            value={userDetails.email}
            name="email"
            className="border rounded-md p-1.5 shadow-sm h-14 w-[30%] hover:border-black"
            onChange={onChangeInHandler}
          />{" "}
          <br />
          <br />
          <input
            type="password"
            required
            placeholder="password"
            value={userDetails.password}
            name="password"
            className="border rounded-md p-1.5 shadow-sm h-14 w-[30%] hover:border-black "
            onChange={onChangeInHandler}
          />
          <div className="w-full py-10 flex flex-col gap-4 items-center">
            {isLoading ? <ClipLoader color="black" size={20} /> :
              <button
                type="submit"
                className="bg-[#A1C75C] w-1/3 h-12 text-lg text-center text-white"
              >
                Register
              </button>
            }

            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link href="/login">
                <a className="underline text-base">
                  Login
                </a>
              </Link>
            </p>
          </div>
        </form>
        <Toaster
          position="bottom-center"
          reverseOrder={true}
          toastOptions={{
            duration: 5000,
          }}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Register;
