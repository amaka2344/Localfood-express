import React, { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "../components/Footer";
import MainPageNav from "../components/mainPageNavbar/mainPageNav";
import toast, { Toaster } from "react-hot-toast";
import { usePaystackPayment } from "react-paystack";
import { getLoggedInUser } from "../services/user";
import { getCartsByUserId, deleteCart } from "../services/cart";
import { addOrder } from "../services/order";
import { getStorageParam } from "../services/misc";
import { useRouter } from "next/router";
import { BiX } from 'react-icons/bi'

const cart = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState({});
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [config, setConfig] = useState({
    reference: new Date().getTime().toString(),
    email: "",
    amount: 0, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: "pk_test_f3b87e94dc24907be0e40ec14350aebb35dc4e57",
  });

  const handleCheckLogin = async () => {
    const user = await getLoggedInUser();
    if (user) {
      config["email"] = user.email;
      setConfig(config);
      setUser(user);
      handleGetCart(user.uid);
    }
  };

  const handleGetCart = async (userId) => {
    try {
      const response = await getCartsByUserId(userId);
      if (response.hasOwnProperty("success") && response.success) {
        setCartItems(response.cartItems);
        const totalPrice = response.cartItems.reduce((accumulator, item) => {
          return accumulator + parseFloat(item.price);
        }, 0);
        config["amount"] = totalPrice * 100;
        setConfig(config);
        setTotal(totalPrice);
      } else {
        toast.error("An error occured, we could not fetch cart");
      }
    } catch (error) {
      toast.error("An error occured, we could not fetch cart");
    }
  };

  const onPaymentSuccess = async (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
    try {
      const orderData = {
        userId: user.uid,
        vendorId: cartItems[0].vendor,
        status: "pending",
        orderedAt: new Date(),
        address,
        longitude,
        latitude,
        comment: "Deliver to address "+address,
        orderId: config.reference,
        distanceCharged: 30,
        deliveryAmount: 200,
        cart: cartItems,
        deliveryDate: new Date(),
        deliveryType: "home",
        transactionId: reference.reference,
        assignedDispatch: "",
        cartAmount: config.amount,
        amountCharged: config.amount,
        discountSlashed: 0,
        couponUsed: false,
        coupon: "",
        deleted: false,
        paid: false,
      };
      const response = await addOrder(orderData);
      if (response.hasOwnProperty("success") && response.success) {
        //delete cart items
        //await deleteCart(user.uid);
        toast.success("Order successful");
        router.push("/orders/"+config.reference);
      } else {
        toast.error("Oops!!, Order failed, please try again");
      }
    } catch (error) {
      toast.error("error");
    }
  };

  // you can call this function anything
  const onPaymentClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    toast.error("Payment modal closed");
  };

  const PayButton = () => {
    const initializePayment = usePaystackPayment(config);
    return (
      <div>
        <button
          className="bg-[#A1C75C] text-white py-2 px-4 rounded-md cursor-pointer font-medium h-[30px] mt-[20px]"
          onClick={() => {
            initializePayment(onPaymentSuccess, onPaymentClose);
          }}
        >
          Checkout Now
        </button>
      </div>
    );
  };

  const getAddress = async () => {
    try {
      let response = await getStorageParam("address");
      setAddress(response);
      response = await getStorageParam("longitude");
      setLongitude(response);
      response = await getStorageParam("latitude");
      setLatitude(response);
    } catch (error) {
      toast.error("An error occured");
    }
  };

  useEffect(() => {
    getAddress();
    handleCheckLogin();
  }, []);
  return (
    <div>
      <MainPageNav />
      <div className="p-6 md:p-10 lg:p-16">
        <div className="flex flex-col md:flex-row lg:pt-[6%] md:pt-[10%] sm:pt-[12%]">
          <div className="md:w-2/3 ">
            <table className="w-full border-collapse text-left  text-black">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.length > 0 &&
                  cartItems.map((item, index) => {
                    return (
                      <>
                        <tr style={{ paddingBottom: "10px" }} key={index}>
                          <td>
                            <div className="relative">
                              <Image
                                src={item.photo}
                                alt={item.productName}
                                width={50}
                                height={50}
                              />
                            </div>
                          </td>
                          <td>
                            <span className="font-normal text-xl">
                              {item.productName}
                            </span>
                          </td>
                          <td>
                            <span>{item.price}</span>
                          </td>
                          <td>
                            <span>
                              {item.quantity} {item.unit}
                            </span>
                          </td>
                          <td>
                            <span className="font-medium text-2xl">
                              NGN {item.price}
                            </span>
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
            <div className="w-full" style={{marginTop:"20px"}}>Delivering to: {address} </div>
          </div>
          <div className="md:w-1/3 mt-6 md:mt-0  text-black">
            <div className="w-full max-w-md bg-amber-100 p-8 flex flex-col justify-between">
              <h2 className="text-2xl font-bold mb-4">CART TOTAL</h2>
              <div className="mb-2">
                <b className="mr-[10px]">Subtotal:</b> NGN {total}.00
              </div>
              <div className="mb-2">
                <b className="mr-[10px]">Discount:</b> $0.00
              </div>
              <div className="mb-2">
                <b className="mr-[10px]">Total:</b> NGN {total}.00
              </div>
              <PayButton />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default cart;
