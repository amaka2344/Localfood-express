import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import plantain from '../public/plantain.jpg'


const RestaurantList = () => {
  // Sample restaurant data
  const restaurants = [
    {
      id: 1,
      name: 'Restaurant 1',
      rating: 4.5,
      categories: ['Intercontinental', 'Snacks'],
      image: 'restaurant1.jpg',
    },
    {
      id: 2,
      name: 'Restaurant 2',
      rating: 3.8,
      categories: ['Italian', 'Pasta'],
      image: 'restaurant2.jpg',
    },
    // Add more restaurant data
  ];

  return (
    <div className="flex w-full pt-10">
      {restaurants.map((restaurant,index) => {
        return <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4">
        <Link href={`/AllRestaurants/${restaurant.id}`} key={restaurant.id}>
        <div className="max-w-sm rounded overflow-hidden shadow cursor-pointer">
            <Link href={`/AllRestaurants/${restaurant.id}`}>
              <a>
            <Image className="w-full cursor-pointer" src={plantain} alt="Restaurant" />
            </a>
            </Link>
            <div className="px-6 py-4">
                <Link href={`/AllRestaurants/${restaurant.id}`}>
                  <a>
                <h2 className="font-bold text-xl mb-2 cursor-pointer text-black hover:text-[#A1C75C]">{restaurant.name}</h2>
                </a>
                </Link>
                <div className="flex items-center mb-2">
                    <div className="text-yellow-500 mr-2">
                        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2L14.48 8.24L21 9.34L16.5 13.54L17.5 20L12 17.77L6.5 20L7.5 13.54L3 9.34L9.52 8.24L12 2Z" />
                        </svg>
                    </div>
                    <div className="text-gray-700">{restaurant.rating}</div>
                </div>
                <div className="flex flex-wrap">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        {restaurant.categories[0]}
                    </span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        {restaurant.categories[1]}
                    </span>
                    {/* Add more categories */}
                </div>
            </div>
        </div>
        </Link>
    </div>
   
      })}
    </div>
  );
};

export default RestaurantList;
