import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import TopNav from "../../components/adminTopNav";
import Link from "next/link";
import { Chip } from "@material-tailwind/react";
import { getLoggedInUser, logOutUser } from "../../services/user";
import { getOrdersByVendorId, updateOrder } from "../../services/order";
import toast, { Toaster } from "react-hot-toast";

const Orders = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [orderId, setOrderId] = useState("");

  const handleCheckLogin = async () => {
    const user = await getLoggedInUser();
    if (!user) {
      toast.error("Please login");
      router.push("/login");
    }
    setUser(user);
  };

  const handleGetOrders = async () => {
    try {
      if(user===null) return;
      const response = await getOrdersByVendorId(user.uid);
      setOrders(response.orders);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChangeOrderStatus = async (orderId, currentStatus) => {
    try {
      setLoading(true);
      let nextStatus = "pending";
      if (user.uid === undefined) return;
      if (currentStatus === "pending") {
        nextStatus = "processing";
      } else if (currentStatus === "processing") {
        nextStatus = "delivering";
      } else if (currentStatus === "delivering") {
        nextStatus = "completed";
      } else if (currentStatus === "completed") {
        return;
      }

      const orderData = { status: nextStatus };
      const response = await updateOrder(orderId, orderData);
      setLoading(false);
      if (response.hasOwnProperty("success") && response.success) {
        toast.success("Order status changed");
        handleGetOrders();
      } else {
        toast.error("Oops!!, error updating order status");
      }
    } catch (error) {
      toast.error("error");
    }
  };

  const variants = {
    processing: "ghost",
    delivering: "ghost",
    pending: "ghost",
    completed: "ghost",
  };

  const logOut = async () => {
    await logOutUser();
    router.push("/login");
  };

  useEffect(() => {
    handleCheckLogin();
  }, []);

  useEffect(() => {
    if (user !== null) {
      handleGetOrders();
    }
  }, [user]);

  return (
    <>
      <div className="flex h-screen">
        {/* Left-hand side navigation */}
        <div className="flex flex-col bg-black w-[20%] md:w-[12%] text-white pt-[50px]">
          <h1 className="text-center pt-8 font-bold text-2xl">
            Local food-express
          </h1>
          <ul className="flex flex-col mt-8">
            <li className="py-2 px-4 hover:bg-gray-300">
              <Link href="/admin/dashboard">
                <a className="flex items-center">
                  <span className="w-6 h-6 mr-2">
                    {/* Add your navigation icon here */}
                  </span>
                  Dashboard
                </a>
              </Link>
            </li>
            <li className="py-2 px-4 hover:bg-gray-300">
              <Link href="/admin/products">
                <a className="flex items-center">
                  <span className="w-6 h-6 mr-2">
                    {/* Add your navigation icon here */}
                  </span>
                  Products
                </a>
              </Link>
            </li>
            <li className="py-2 px-4 hover:bg-gray-300">
              <Link href="/admin/orders">
                <a className="flex items-center">
                  <span className="w-6 h-6 mr-2">
                    {/* Add your navigation icon here */}
                  </span>
                  Orders
                </a>
              </Link>
            </li>
            <li
              className="py-2 px-4 hover:bg-gray-300 cursor-pointer"
              onClick={logOut}
            >
              <a className="flex items-center">
                <span className="w-6 h-6 mr-2">
                  {/* Add your navigation icon here */}
                </span>
                Logout
              </a>
            </li>
          </ul>
        </div>

        {/* Right-hand side content */}
        <div className="flex flex-col flex-1">
          <TopNav />

          <div className=" gap-4 text-black p-4">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold mb-4">Orders</h1>
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-4">Id</th>
                    <th className="py-2 px-4">Customer</th>
                    <th className="py-2 px-4">Total</th>
                    <th className="py-2 px-4">Date</th>
                    <th className="py-2 px-4">Product Items</th>
                    <th className="py-2 px-4">Status</th>
                    <th className="py-2 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 &&
                    orders.map((order, index) => {
                      return (
                        <tr key={index} className="border-b">
                          <td className="py-2 px-4">{order.orderId}</td>
                          <td className="py-2 px-4">{order.customerName}</td>
                          <td className="py-2 px-4">{order.amountCharged}</td>
                          <td className="py-2 px-4">{order.orderAt}</td>
                          {order.cart.length > 0 &&
                            order.cart.map((cart) => {
                              return (
                                <>
                                  <tr>
                                    <td className="py-2 px-4">
                                      {cart.productName}
                                    </td>
                                    <td className="py-2 px-4">
                                      {cart.quantity}
                                    </td>
                                    <td className="py-2 px-4">N{cart.price}</td>
                                  </tr>
                                </>
                              );
                            })}
                          <td className="py-2 px-4">
                            <Chip
                              variant={variants[order.status]}
                              value={order.status}
                            />
                          </td>
                          <td className="py-2 px-4">
                            <button
                              className="bg-blue-500 text-white px-3 py-1 rounded"
                              onClick={() => {
                                setOrderId(order.orderId);
                                handleChangeOrderStatus(
                                  order.orderId,
                                  order.status
                                );
                              }}
                              disabled={orderId === order.orderId && loading}
                            >
                              Next Stage
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
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
      </div>
    </>
  );
};

export default Orders;
