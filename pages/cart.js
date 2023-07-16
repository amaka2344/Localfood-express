import React, { useState, useEffect } from "react";
import Image from "next/image";
import { HiOutlineX } from "react-icons/hi";
import Footer from "../components/Footer";
import MainPageNav from "../components/mainPageNavbar/mainPageNav";
import toast, { Toaster } from "react-hot-toast";
import { usePaystackPayment } from "react-paystack";
import { getLoggedInUser } from "../services/user";
import { getCartsByUserId, deleteCart } from "../services/cart";
import { addOrder } from "../services/order";
import { getStorageParam } from "../services/misc";
import { useRouter } from "next/router";

const Cart = () => {
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
    amount: 0,
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
        setTotal(totalPrice);
        config["amount"] = totalPrice * 100;
        setConfig(config);
      } else {
        toast.error("An error occurred, we could not fetch cart");
      }
    } catch (error) {
      toast.error("An error occurred, we could not fetch cart");
    }
  };

  const onPaymentSuccess = async (reference) => {
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
        comment: "Deliver to address " + address,
        orderId: config.reference,
        distanceCharged: 30,
        deliveryAmount: 200,
        cart: cartItems,
        customer: user,
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
        await deleteCart(user.uid);
        toast.success("Order successful");
        router.push("/orders/" + config.reference);
      } else {
        toast.error("Oops!!, Order failed, please try again");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const onPaymentClose = () => {
    toast.error("Payment Failed");
  };

  const handleRemoveCartItem = async (itemId) => {
    try {
      await deleteCart(itemId);
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item.id !== itemId)
      );
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("An error occurred while removing the item from cart");
    }
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
      toast.error("An error occurred");
    }
  };

  useEffect(() => {
    getAddress();
    handleCheckLogin();
  }, []);

  useEffect(() => {
    // Reset cart total to 0.00 when cartItems are empty
    if (cartItems.length === 0) {
      setTotal(0);
    }
  }, [cartItems]);

  return (
    <div className="flex flex-col min-h-screen">
      <MainPageNav />
      <div className="p-6 md:p-10 lg:p-16 flex-grow mt-24">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/3">
            {cartItems.length > 0 ? (
              <table className="w-full border-collapse text-left text-black">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} style={{ paddingBottom: "10px" }}>
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
                        <button
                          className="text-red-500 text-2xl"
                          onClick={() => handleRemoveCartItem(item.id)}
                        >
                          <HiOutlineX />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-2xl text-black font-bold">No products in the cart</p>
            )}
            <div className="w-full text-black" style={{ marginTop: "20px" }}>
              <h3>Delivering to: {address}</h3>
            </div>
          </div>
          <div className="md:w-1/3 mt-6 md:mt-0 text-black">
            <div className="w-full max-w-md bg-amber-100 p-8 flex flex-col justify-between">
              <h2 className="text-2xl font-bold mb-4">CART TOTAL</h2>
              <div className="mb-2">
                <b className="mr-[10px]">Subtotal:</b> &#x20A6;{total.toFixed(2)}
              </div>
              <div className="mb-2">
                <b className="mr-[10px]">Discount:</b> &#x20A6;0.00
              </div>
              <div className="mb-2">
                <b className="mr-[10px]">Total:</b> &#x20A6;{total.toFixed(2)}
              </div>
              <PayButton />
            </div>
          </div>
        </div>
      </div>
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
};

export default Cart;
