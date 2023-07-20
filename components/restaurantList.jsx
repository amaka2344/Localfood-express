import React from "react";
import Link from "next/link";
import Image from "next/image";

const RestaurantList = (props) => {
  const { restaurants, customerLatitude, customerLongitude } = props;

  const distanceBetweenCoordinates = (customerLongitude, customerLatitude, vendorLongitude, vendorLatitude) => {
      if (
        customerLongitude === "" ||
        customerLongitude === undefined ||
        customerLongitude === null ||
        customerLatitude === "" ||
        customerLatitude === undefined ||
        customerLatitude === null ||
        vendorLongitude === "" ||
        vendorLongitude === undefined ||
        vendorLongitude === null ||
        vendorLatitude === "" ||
        vendorLatitude === undefined ||
        vendorLatitude === null
      ) {
        return "?";
      }
    const earthRadiusKm = 6371; // Earth's radius in kilometers

    // Convert latitude and longitude from degrees to radians
    const lat1 = (customerLatitude * Math.PI) / 180;
    const lon1 = (customerLongitude * Math.PI) / 180;
    const lat2 = (vendorLatitude * Math.PI) / 180;
    const lon2 = (vendorLongitude * Math.PI) / 180;

    // Haversine formula
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Calculate the distance in kilometers
    const distanceInKm = earthRadiusKm * c;
    return distanceInKm;
  };

  
  return (
    <div className="flex flex-wrap mx-32 mt-14">
      {restaurants.length > 0 &&
        restaurants.map((restaurant, index) => {
          return (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4 mb-4"
            >
              <Link
                href={`/AllRestaurants/${restaurant.uid}`}
                key={restaurant.id}
              >
                <div className="max-w-sm rounded overflow-hidden shadow cursor-pointer relative">
                  <div className="h-80">
                    <Link href={`/AllRestaurants/${restaurant.uid}`}>
                      <a>
                        <Image
                          className="w-full h-full object-cover cursor-pointer"
                          src={restaurant.logo}
                          layout="fill"
                          alt="Restaurant"
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="overlay absolute bottom-0  left-0 py-2 pl-6 bg-black w-full text-white transition-opacity duration-300">
                    <Link href={`/AllRestaurants/${restaurant.uid}`}>
                      <a>
                        <h2 className="font-bold text-xl mb-2 cursor-pointer text-white hover:text-[#A1C75C]">
                          {restaurant.userName}
                        </h2>
                      </a>
                    </Link>
                    <div className="flex items-center mb-2">
                      <div className="text-yellow-500">
                        <svg
                          className="h-5 w-5 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2L14.48 8.24L21 9.34L16.5 13.54L17.5 20L12 17.77L6.5 20L7.5 13.54L3 9.34L9.52 8.24L12 2Z" />
                        </svg>
                      </div>
                      <div className="text-yellow-500">
                        <svg
                          className="h-5 w-5 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2L14.48 8.24L21 9.34L16.5 13.54L17.5 20L12 17.77L6.5 20L7.5 13.54L3 9.34L9.52 8.24L12 2Z" />
                        </svg>
                      </div>
                      <div className="text-yellow-500">
                        <svg
                          className="h-5 w-5 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2L14.48 8.24L21 9.34L16.5 13.54L17.5 20L12 17.77L6.5 20L7.5 13.54L3 9.34L9.52 8.24L12 2Z" />
                        </svg>
                      </div>
                      <div className="text-yellow-500">
                        <svg
                          className="h-5 w-5 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2L14.48 8.24L21 9.34L16.5 13.54L17.5 20L12 17.77L6.5 20L7.5 13.54L3 9.34L9.52 8.24L12 2Z" />
                        </svg>
                      </div>
                      <div className="text-yellow-500">
                        <svg
                          className="h-5 w-5 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2L14.48 8.24L21 9.34L16.5 13.54L17.5 20L12 17.77L6.5 20L7.5 13.54L3 9.34L9.52 8.24L12 2Z" />
                        </svg>
                      </div>
                      <div className="ml-40 text-white font-bold">{distanceBetweenCoordinates(
                        customerLongitude,
                        customerLatitude,
                        restaurant.longitude,
                        restaurant.latitude
                      )}km away</div>
                    </div>
                    <div className="flex flex-wrap">
                      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        Local
                      </span>
                      {/* Add more categories */}
                    </div>
                  </div>
                </div>
              </Link>
              <style jsx>{`
        .overlay:hover {
          opacity: 1;
        }
      `}</style>
            </div>
          );
        })}
    </div>
  );
};

export default RestaurantList;
