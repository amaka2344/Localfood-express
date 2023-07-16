import { React, useState, useEffect } from "react";
import { useRouter } from "next/router";
import MainPageNavBar from "../components/mainPageNavbar/mainPageNav";
import { getLoggedInUser, updateUser } from "../services/user";
import toast, { Toaster } from "react-hot-toast";

const EditProfile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updatedUserDetails, setUpdatedUserDetails] = useState({
    userName: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    // Perform save profile logic here
    try {
      setLoading(true);
      const response = await updateUser(user.uid, updatedUserDetails);
      setLoading(false);
      if (response.hasOwnProperty("success") && response.success) {
        alert(response.message);
        toast.success(response.message);
        localStorage.setItem("loggedInUser", JSON.stringify(response.userData));
      } else {
        toast.error("Oops!!, user update failed");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      alert(error.message);
    }
  };

  //redirect to homepage after editing profile
  // router.push('/userHomepage')

  const handleCheckLogin = async () => {
    const user = await getLoggedInUser();
    if (!user || user.userType !== "customer") {
      toast.error("Please login as customer");
      router.push("/login");
    }
    setUser(user);
    updatedUserDetails["userName"] = user.userName;
    updatedUserDetails["address"] = user.address;
    setUpdatedUserDetails(updatedUserDetails);
  };

  useEffect(() => {
    handleCheckLogin();
  }, []);

  return (
    <>
      <MainPageNavBar />
      <div className="flex flex-col items-center justify-center min-h-screen text-black">
        <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
        <div className="w-full sm:w-96 px-4">
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 font-medium">
                Username:
              </label>
              <input
                type="text"
                name="userName"
                placeholder="Enter New Username"
                defaultValue={updatedUserDetails.userName}
                onChange={handleInputChange}
                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block mb-2 font-medium">
                Address:
              </label>
              <input
                type="tex"
                name="address"
                placeholder="Enter New Address"
                defaultValue={updatedUserDetails.address}
                onChange={handleInputChange}
                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              />
            </div>
            <button
              onClick={handleSaveProfile}
              disabled={loading}
              className="bg-[#A1C75C] text-white px-4 py-2 rounded-lg"
            >
              {loading ? "Wait..." : "Save"}
            </button>
        </div>
      </div>
      <Toaster
          position="bottom-center"
          reverseOrder={true}
          toastOptions={{
            duration: 5000,
          }}
        />
    </>
  );
};

export default EditProfile;
