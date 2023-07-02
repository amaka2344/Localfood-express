import { React, useState } from 'react';

const TopNav = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [restaurantName, setRestaurantName] = useState('Restaurant Name');
  const [restaurantAddress, setRestaurantAddress] = useState('Restaurant Address');
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAddress, setNewAddress] = useState('');

  const handleSettingsClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleEditClick = () => {
    setEditing(true);
    setNewName(restaurantName);
    setNewAddress(restaurantAddress);
  };

  const handleSaveClick = () => {
    setEditing(false);
    setRestaurantName(newName);
    setRestaurantAddress(newAddress);
    setIsDrawerOpen(false); // Close the drawer after saving
  };

  return (
    <nav className=" flex items-center justify-between bg-[#A1C75C] text-white px-4 py-3 mb-[5%]">
      <div className="text-2xl font-bold">
        {restaurantName}
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
          <div className="relative bg-white shadow-lg rounded-lg p-6 w-[30%] h-[40%]">
            <h2 className="text-2xl font-bold mb-8">Settings</h2>
            <div className="mb-4">
              <h3 className="text-lg font-bold mb-2">Restaurant Name</h3>
              <div className="flex items-center">
                {editing ? (
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1 mr-2 flex-grow"
                  />
                ) : (
                  <p>{restaurantName}</p>
                )}
                <button
                  className="text-amber-500 ml-2"
                  onClick={() => handleEditClick('name')}
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
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1 mr-2 flex-grow"
                  />
                ) : (
                  <p>{restaurantAddress}</p>
                )}
                <button
                  className="text-amber-500 ml-2"
                  onClick={() => handleEditClick('address')}
                >
                  Edit
                </button>
              </div>
            </div>
            {editing && (
              <button
                className="px-4 py-2 bg-[#A1C75C] text-white rounded-md mt-4"
                onClick={handleSaveClick}
              >
                Save
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default TopNav;
