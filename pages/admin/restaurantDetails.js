import { React, useEffect, useState } from "react";
//import userouter
import { useRouter } from "next/router";
import Image from "next/image";
import { BsBoxArrowUp } from "react-icons/bs";
//import toast
import toast, { Toaster } from "react-hot-toast";
//import loader
import ClipLoader from "react-spinners/ClipLoader";
//import services
import { registerVendor } from "../../services/user";

const RestaurantDetails = () => {
  const router = useRouter();
  const { data } = router.query;
  const jsonData = JSON.parse(decodeURIComponent(data));
  const [vendorDetails, setVendorDetails] = useState({
    restaurantName: "",
    email: jsonData?.email,
    phoneNumber: "",
    address: "",
    logo: null,
    password: jsonData?.password,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (
      !jsonData.hasOwnProperty("email") ||
      !jsonData.hasOwnProperty("password")
    ) {
      toast.error("Please enter email and password to continue");
      router.push("/admin");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVendorDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;      
      // Update the state with the base64 string
      setVendorDetails((prevState) => ({
        ...prevState,
        logo: base64String,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form submission logic here
    try {
      setIsLoading(true);
      const response = await registerVendor(vendorDetails);
      setIsLoading(false);
      if (response.hasOwnProperty("success") && response.success) {
        setVendorDetails({
          restaurantName: "",
          email: "",
          phoneNumber: "",
          address: "",
          logo: null,
          password: "",
        });
        setIsLoading(false)
        // navigate user to login page
        toast.success("Registration Successful, redirecting to login");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      }
    } catch (error) {
      toast.error("error");
    }
  };

  // If validation passes, proceed with form submission
  return (
    <div className="text-center px-[4%] justify-center items-center md:px-[6%] pt-[10%]">
      <div>
        <h1 className=" font-bold text-3xl text-black">Complete Signup</h1>
        <p className="pb-9 text-gray-400">Fill in your Restaurant Details</p>
      </div>
      <form
        action=""
        className="block max-w-md mx-auto text-black"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <div className="flex items-center">
            <label
              htmlFor="logoUpload"
              className="w-14 h-14 bg-gray-200 flex items-center justify-center rounded-lg cursor-pointer"
            >
              {vendorDetails.logo ? (
                <Image
                  src={vendorDetails.logo}
                  alt="Restaurant Logo"
                  className="object-cover rounded-lg"
                  width={100}
                  height={100}
                />
              ) : (
                <BsBoxArrowUp color="black" width={150} height={100} />
              )}
            </label>
            <input
              type="file"
              id="logoUpload"
              name="logo"
              accept="image/*"
              className="hidden"
              onChange={handleLogoChange}
            />
            <p className=" text-black ml-2">Add Restaurant Logo</p>
          </div>
        </div>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Restaurant Name"
            id="restaurantName"
            name="restaurantName"
            value={vendorDetails.restaurantName}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-amber-500"
          />
        </div>
        <div className="mb-6">
          <input
            placeholder="Restaurant Email"
            type="email"
            id="email"
            name="email"
            value={vendorDetails.email}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-amber-500"
          />
        </div>
        <div className="mb-6">
          <input
            placeholder="Restaurant Phone Number"
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={vendorDetails.phoneNumber}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-amber-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="address" className="block mb-2">
            Restaurant Address
          </label>
          <input
            placeholder="Restaurant Address"
            type="address"
            id="address"
            name="address"
            value={vendorDetails.address}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-4 py-2 w-full h-24 resize-none focus:outline-none focus:border-amber-500"
          />
        </div>
        <div className="w-full py-10 flex flex-col gap-4 items-center">
          {isLoading ? (
            <ClipLoader color="black" size={20} />
          ) : (
            <button
              type="submit"
              className=" bg-[#A1C75C] w-1/3 h-12 text-lg text-center"
            >
              Submit
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
// onSubmit={handleSubmit}
export default RestaurantDetails;
