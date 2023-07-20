import { React, useState } from "react";
//import userouter
import { useRouter } from "next/router";
//import toast
import toast, { Toaster } from "react-hot-toast";
//import loader
import ClipLoader from "react-spinners/ClipLoader";

const AdminLogin = () => {
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
    try {
      setIsLoading(true);
      localStorage.setItem('regState', JSON.stringify(formData));
      router.push('/admin/restaurantDetails');
    } catch (error) {
      toast.error(error.message);
    }
  };

  // If validation passes, proceed with form submission
  return (
    <div className="text-center px-[4%] justify-center items-center md:px-[6%] pt-[10%]">
      <div>
        <h1 className=" font-bold text-3xl text-black">Sign Up as a Vendor</h1>
        <p className="pb-9 text-gray-400">Fill in the details to get started</p>
      </div>
      <form action="" className="block" onSubmit={handleSubmit}>
        <input
          type="email"
          required
          placeholder="email"
          value={userDetails.email}
          name="email"
          className="border rounded-md p-1.5 shadow-sm h-14 w-[30%] hover:border-black text-black"
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
              Next
            </button>
          )}
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
  );
};

export default AdminLogin;
