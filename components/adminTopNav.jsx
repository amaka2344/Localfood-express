import React, { useState, useEffect } from "react";
import { getLoggedInUser, updateBusiness } from "../services/user";
import toast, { Toaster } from "react-hot-toast";

const TopNav = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [user, setUser] = useState(null);

  const handleSettingsClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleEditClick = () => {
    setEditing(true);
    setNewName(restaurantName);
    setNewAddress(restaurantAddress);
  };

  const handleSaveClick = async () => {
    try {
      setLoading(true);
      setRestaurantName(newName);
      setRestaurantAddress(newAddress);
      // Close the drawer after saving
      const businessData = {
        userName: newName,
        address: newAddress,
      };
      const response = await updateBusiness(user.uid, businessData);
      if (response.hasOwnProperty("success") && response.success) {
        toast.success(response.message);
        setLoading(false);
        setIsDrawerOpen(false);
        setEditing(false);
        localStorage.setItem("loggedInUser", JSON.stringify(response.userData));
      } else {
        toast.error("Oops!!, bussiness update failed");
      }
    } catch (error) {
      setIsDrawerOpen(false);
      setEditing(false);
      setLoading(false);
      toast.error(error.message);
    }
  };

  const handleCheckLogin = async () => {
    const user = await getLoggedInUser();
    if (!user || user.userType !== "vendor") {
      toast.error("Please login as vendor");
      router.push("/login");
    }
    setUser(user);
    setNewAddress(user.address);
    setNewName(user.userName);
  };

  useEffect(() => {
    handleCheckLogin();
  }, [editing]);

  return (
    <>
      <nav className=" flex items-center justify-between bg-[#A1C75C] text-white px-4 py-3 mb-[5%]">
        <div className="text-2xl font-bold">
          {user !== null && user.userName}
        </div>
        <div>
          <button
            className="text-white hover:text-gray-300 focus:text-gray-300"
            onClick={handleSettingsClick}
          >
            Settings
          </button>
        </div>

        {isDrawerOpen && (
          <div className="fixed inset-0 z-10 flex items-center justify-center text-black">
            <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            <div className="relative bg-white shadow-lg rounded-lg p-6 w-[30%] h-[60%]">
              <h2 className="text-2xl font-bold mb-8">Settings</h2>
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Restaurant Name</h3>
                <div className="flex items-center">
                  {editing ? (
                    <input
                      type="text"
                      defaultValue={user?.userName}
                      placeholder="Enter New Name"
                      onChange={(e) => setNewName(e.target.value)}
                      className="border border-gray-300 rounded-md px-2 py-1 mr-2 flex-grow"
                    />
                  ) : (
                    <p>{user?.userName}</p>
                  )}
                  <button
                    className="text-amber-500 ml-2"
                    onClick={() => handleEditClick("name")}
                  >
                    Edit
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Restaurant Address</h3>
                <div className="flex items-center">
                  {editing ? (
                    <input
                      type="text"
                      defaultValue={user?.address}
                      placeholder="Enter New Address"
                      onChange={(e) => setNewAddress(e.target.value)}
                      className="border border-gray-300 rounded-md px-2 py-1 mr-2 flex-grow"
                    />
                  ) : (
                    <p>{user?.address}</p>
                  )}
                  <button
                    className="text-amber-500 ml-2"
                    onClick={() => handleEditClick("address")}
                  >
                    Edit
                  </button>
                </div>
              </div>
              {editing && (
                <button
                  className="px-4 py-2 bg-[#A1C75C] text-white rounded-md mt-4"
                  onClick={handleSaveClick}
                  disabled={loading}
                >
                  {loading ? "Wait.." : "Save"}
                </button>
              )}
              <button
                className="px-4 ml-6 py-2 bg-red-500 text-white rounded-md mt-4"
                onClick={() => setIsDrawerOpen(false)}
                disabled={loading}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default TopNav;
