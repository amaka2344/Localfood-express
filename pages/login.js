import { React, useState } from "react";
import icon from "../public/icon.png";
import Image from "next/image";
import Link from "next/link";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
//import userouter
import { useRouter } from "next/router";
//import toast
import toast, { Toaster } from "react-hot-toast";
//import loader
import ClipLoader from "react-spinners/ClipLoader";
//import services
import { login } from "../services/user";

const Login = () => {
  const router = useRouter();
  // input usestate
  const [userDetails, setUserDetails] = useState({
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
    if (!formData.email) {
      return toast.error("Please input Email");
    }
    if (!formData.password) {
      return toast.error("Please input Password");
    }
    if (formData.password.length <= 5) {
      return toast.error("Password should have more than five character.");
    }

    setIsLoading(true);

    try {
      const response = await login(userDetails);
      setIsLoading(false);
      if (response.hasOwnProperty("success") && response.success) {
        toast.success("Login successful");
        localStorage.setItem("loggedInUser", JSON.stringify(response.userData));
        // navigate user to dashboard page
        if (response.userData.userType === "vendor") {
          router.push("/admin/dashboard/");
        } else {
          router.push("/AllRestaurants/");
        }
      } else {
        toast.error("login failed");
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Error:", error);
      toast.error("Login failed", error);
      if (error.message.includes("wrong-password")) {
        toast.error("User does not exist");
      } else {
        toast.error("An error occured");
      }
    }
  };

  // If validation passes, proceed with form submission
  return (
    <>
      <NavBar />
      <div className="text-center px-[4%] justify-center items-center md:px-[6%] pt-[10%]">
        <div className="items-center justify-center flex pb-10">
          <Image src={icon} alt="icon" width={100} height={70} />
        </div>
        <div>
          <h1 className=" font-bold text-3xl text-black">
            Welcome to Local Food-Express
          </h1>
          <p className="pb-9 text-gray-400">
            Fill in the details to log in or create a Local Food-Express Account
          </p>
        </div>
        <form action="" className="block" onSubmit={handleSubmit}>
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
            placeholder="password"
            value={userDetails.password}
            name="password"
            className="border rounded-md p-1.5 shadow-sm h-14 w-[30%] hover:border-black text-black "
            onChange={onChangeInHandler}
          />
          <div className="w-full py-10 flex flex-col gap-4 items-center">
            {isLoading ? (
              <ClipLoader color="black" size={20} />
            ) : (
              <button
                type="submit"
                className=" bg-[#A1C75C] w-1/3 h-12 text-lg text-center"
              >
                Log In
              </button>
            )}

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
        <Toaster
          position="bottom-center"
          reverseOrder={true}
          toastOptions={{
            duration: 5000,
          }}
        />
      </div>
      <Footer />
    </>
  );
};

export default Login;
