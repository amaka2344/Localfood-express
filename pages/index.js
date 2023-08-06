import { React, useState, useEffect } from "react";
import { BsGeo } from "react-icons/bs";
import soup from "../public/soup-removebg-preview.png";
import Image from "next/image";
import logo11 from "../public/logo11.png";
import logo12 from "../public/logo12.png";
import logo13 from "../public/logo13.png";
import RestaurantList from "../components/restaurantList";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { geocodeAddress } from "../services/misc";
import { getVendors } from "../services/user";


export default function Home() {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);

  const handleFetchVendors = async () => {
    try {
      setLoading(true);
      const addy = await geocodeAddress(address);
      const longitude = addy?.features[0]?.geometry?.coordinates[0];
      const latitude = addy?.features[0]?.geometry?.coordinates[1];
      localStorage.setItem("longitude", longitude);
      localStorage.setItem("latitude", latitude);
      localStorage.setItem("address", address);
      router.push("/AllRestaurants");
    } catch (error) {
      toast.error("We could not proceed with request");
    }
  };

  const getRestaurants = async () => {
    try {
      const response = await getVendors();
      setRestaurants(response.users);
    } catch (error) {
      toast.error("An error occured");
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="flex justify-between items-center py-1  px-[4%] md:px-[6%]">
        <section className="max-w-xl mx-auto sm:mx-0 w-full lg:w-1/3 sm:mt-[20%] pb-[15%]">
          <h1 className=" text-6xl sm:text-7xl lg:text-6xl font-semibold text-black w-full">
            Savor the Best Local Cuisine{" "}
            <span className="font-bold text-[#A1C75C]">at Your Doorstep</span>
          </h1>
          <p className="py-3 text-md  text-gray-600">
            Order Healthy and Tasty Intercontinental Food Online
            <br />
            Wherever and Whenever from{" "}
            <span className="font-bold text-[#A1C75C]">LOCAL FOOD-EXPRESS</span>
          </p>
          <div className="flex items-center">
            <div className="bg-amber-100 rounded-full p-2">
              <BsGeo className="text-[25px] text-[#A1C75C]" />
            </div>
            <input
              type="text"
              placeholder="Enter your Delivery Address"
              className="text-black ml-2 w-full px-4 py-2 border border-gray-100 rounded-md focus:outline-none focus:ring focus:ring-amber-100"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <button className="text-white bg-[#A1C75C] w-12 rounded h-10" onClick={handleFetchVendors}>Go</button>
          </div>
        </section>
        <div className="hidden w-1/2 lg:flex justify-end">
          <Image src={soup} alt="heroImg" className="w-2/3 h-full" />
        </div>
      </div>
      <div className="bg-amber-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start justify-center">
            <div className="flex flex-col items-center justify-center">
              <Image
                src={logo11}
                alt="Logo"
                className="mb-4"
                width={100}
                height={100}
              />
              <div className="text-center">
                <h3 className="text-lg sm:text-2xl text-gray-500 font-medium mb-2">
                  Browse, Choose, and Order
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Explore our curated selection of local restaurants and their
                  enticing menus.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src={logo12}
                alt="Logo"
                className="mb-4"
                width={100}
                height={100}
              />
              <div className="text-center">
                <h3 className="text-lg sm:text-2xl text-gray-500 font-medium mb-2">
                  Secure and Seamless Transactions
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Make payments hassle-free using your preferred method, whether
                  it's credit card, digital wallet, or cash on delivery.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Image
                src={logo13}
                alt="Logo"
                className="mb-4"
                width={100}
                height={100}
              />
              <div className="text-center">
                <h3 className="text-lg sm:text-2xl text-gray-500 font-medium mb-2">
                  Swift Delivery to Your Doorstep
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Once your order is placed, sit back and relax. Our trusted
                  delivery partners will swiftly pick up your food from the
                  restaurant and ensure it reaches your doorstep with care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-black text-3xl pt-10 ml-20">Restaurants you might like</h1>
      {restaurants.length > 0 && <RestaurantList restaurants={restaurants} />}
      {restaurants.length === 0 && (
        <div className="w-full">No restaurant found </div>
      )}
      <Toaster
          position="bottom-center"
          reverseOrder={true}
          toastOptions={{
          duration: 5000,
          }}
        />
      <Footer />
    </div>
  );
}
