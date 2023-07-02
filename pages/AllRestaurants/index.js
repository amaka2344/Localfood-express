import { React, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import RestaurantList from '../../components/restaurantList';
import MainPageNav from '../../components/mainPageNavbar/mainPageNav'
import Footer from '../../components/Footer';


const AllRestaurants = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    // Handle search submission logic
    // Make API request with the search query
    // Update the restaurant listing based on the search results received
  };

  return (
    <>
    <MainPageNav/>
    <div className='pt-[8%] items-center py-1  px-[4%] md:px-[6%] '>
      <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
        <div className="relative flex-grow w-full">
          <h1 className="leading-7 text-lg text-gray-800">Delivering To:</h1>
          <p className="w-full text-base outline-none text-gray-700 py-1 leading-8">123 Main St, City, Country</p>
        </div>
        <div className="relative flex-grow w-full">
          <input type="email" value={searchQuery} onChange={handleSearchChange} name="email" placeholder='search for restaurants' className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-amber-100 focus:bg-transparent focus:ring-2 focus:ring-amber-100 text-base outline-none text-gray-700 py-3 px-3 leading-8" />
        </div>
        <div>
          <button onClick={handleSearchSubmit} className="text-white bg-[#A1C75C] py-[15px] px-7 focus:outline-none hover:bg-[#A1C75C] rounded text-lg">
            <FiSearch />
          </button>
        </div>
      </div>
      <RestaurantList />
    </div>
    <Footer />
    </>
  );
};

export default AllRestaurants