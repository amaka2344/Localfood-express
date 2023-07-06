import { React, useState } from 'react';
import { useRouter } from 'next/router';
import MainPageNavBar from '../components/mainPageNavbar/mainPageNav';

const EditProfile = () => {

  //previous user details
  const [previousUserDetails] = useState({
    username: "john doe",
    address: "123 main st, abuja"
  })

  const router = useRouter()

  //updated user(form state)
  const [updatedUserDetails, setUpdatedUserDetails] = useState({
    Username: previousUserDetails.username,
    Address: previousUserDetails.address
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSaveProfile = () => {
    // Perform save profile logic here
    console.log('Name:', updatedUserDetails);
  };

  //redirect to homepage after editing profile
  // router.push('/userHomepage')

  return (
    <>
      <MainPageNavBar />
       <div className="flex flex-col items-center justify-center min-h-screen text-black">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <div className="w-full sm:w-96 px-4">
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 font-medium">
                Username:
              </label>
              <input
                type="text"
                name="Username"
                value={updatedUserDetails.Username}
                onChange={handleInputChange}
                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block mb-2 font-medium">
                Address:
              </label>
              <input
                type="address"
                name="Address"
                value={updatedUserDetails.Address}
                onChange={handleInputChange}
                className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              />
            </div>
            <button
              onClick={handleSaveProfile}
              className="bg-[#A1C75C] text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
