import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Typography } from "@material-tailwind/react";
import { BiPlus } from "react-icons/bi";
import Image from "next/image";
import spagetti from "../../public/spagetti.jpg";
import MainPageNav from "../../components/mainPageNavbar/mainPageNav";
import Footer from "../../components/Footer";
import { getVendor, getLoggedInUser, getUser } from "../../services/user";
import { getProductsByVendor } from "../../services/product";
import { addCart } from "../../services/cart";
import toast, { Toaster } from "react-hot-toast";

const RestaurantId = () => {
  const router = useRouter();
  const { restaurantId } = router.query;
  const [restaurant, setRestaurant] = useState(null);
  const [productList, setProductList] = useState([]);
  const [user, setUser] = useState({});

  const getRestaurant = async () => {
    try {
      const response = await getVendor(restaurantId);
      setRestaurant(response.userData);
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleGetProductsByVendor = async () => {
    try {
      const response = await getProductsByVendor(restaurantId);
      setProductList(response.products);
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleAddCart = async (product) => {
    try {
      const cartData = {
        productId: product.id,
        quantity: 1,
        price: product.price,
        unit: product.unitId,
        userId: user.uid,
        vendor: product.userId,
        photo: product.photo,
        productName: product.productName,
      };
      const response = await addCart(cartData);
      if (response.hasOwnProperty("success") && response.success) {
        toast.success("Product added to cart");
      } else {
        toast.error("Oops!!, failed to add product to cart");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleCheckLogin = async () => {
    const user = await getLoggedInUser();
    if (!user) {
      toast.error("Please login");
      router.push("/login");
    }
    setUser(user);
  };

  useEffect(() => {
    handleCheckLogin();
    getRestaurant();
    handleGetProductsByVendor();
  }, [restaurantId]);

  return (
    <>
      <MainPageNav />
      <div className="pt-[6%]">
        <Image
          className="w-full"
          height={400}
          src={spagetti}
          alt="spaghetti banner"
        />
        <figure className="relative">
          <figcaption className="absolute bottom-8 left-2/4 transform -translate-x-2/4 sm:flex sm:justify-between bg-white py-4 px-6 sm:w-[calc(100%-4rem)] sm:saturate-200 sm:backdrop-blur-sm">
            <div className="flex flex-col text-black">
              <Typography variant="h5" color="black">
                {restaurant !== null && restaurant.userName}
              </Typography>
              <Typography color="black" className="mt-2 font-normal">
                {restaurant !== null && restaurant.address}
              </Typography>
            </div>
            <Typography variant="h5" color="black" className="mt-2 sm:mt-0">
              10-20 min
            </Typography>
          </figcaption>
        </figure>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
              {productList.length > 0 &&
                productList.map((product, index) => {
                  return (
                    <div
                      key={index}
                      className="p-4 lg:w-1/2 md:w-full sm:w-1/2 xl:w-1/3"
                    >
                      <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8">
                        <div className="w-[20%] sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center flex-shrink-0">
                          <Image
                            src={product.photo}
                            width="300"
                            height="300"
                            alt="Food"
                            className="w-12 h-12"
                          />
                        </div>
                        <div className="flex-grow">
                          <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                            {product.productName}
                          </h2>
                          <p className="leading-relaxed text-base">
                            {product.description}
                          </p>
                          <div className="flex items-center mt-3 justify-between">
                            <p className="ml-2 text-amber-500 pr-8 font-bold">
                              &#x20A6; {product.price} / {product.unitId}
                            </p>
                            <button
                              className="bg-[#A1C75C] hover:bg-[#A1C75C] text-white font-bold py-2 px-4 rounded"
                              onClick={() => {
                                handleAddCart(product);
                              }}
                            >
                              <BiPlus />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default RestaurantId;
