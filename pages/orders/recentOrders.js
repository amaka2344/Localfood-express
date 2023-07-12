import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MainPageNavBar from "../../components/mainPageNavbar/mainPageNav";
import Footer from "../../components/Footer";
import { Chip } from "@material-tailwind/react";
import Link from "next/link";
import { getLoggedInUser, logOutUser } from "../../services/user";
import { getOrdersByUserId } from "../../services/order";
import toast, { Toaster } from "react-hot-toast";

const RecentOrders = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const variants = {
    processing: "ghost",
    pending: "ghost",
    completed: "ghost",
  };
  const handleGetOrders = async () => {
    try {
      if (user.uid === undefined) return;
      const response = await getOrdersByUserId(user.uid);
      setOrders(response.orders);
    } catch (error) {
      toast.error("error");
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
  }, []);

  useEffect(() => {
    handleGetOrders();
  }, [user]);

  return (
    <div>
      <MainPageNavBar />
      <div className="p-[50px] flex lg:pt-[8%] md:pt-[10%] sm:pt-[12%] px-[6%]">
        <div className="flex-[2]">
          <div>
            <table className="w-full text-left" style={{ minHeight: "400px" }}>
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4">Id</th>
                  <th className="py-2 px-4">Address</th>
                  <th className="py-2 px-4">Total</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Items</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 &&
                  orders.map((order, index) => {
                    return (
                      <tr className="border-b">
                        <td className="py-2 px-4">{order.orderId}</td>
                        <td className="py-2 px-4">{order.address}</td>
                        <td className="py-2 px-4">{order.amountCharged}</td>
                        <td className="py-2 px-4">{order.orderAt}</td>
                        <td className="py-2 px-4">
                          <table>
                            <thead>
                              <td>Product Name</td>
                              <td>Qty</td>
                              <td>Price</td>
                            </thead>
                            {order.cart.length > 0 &&
                              order.cart.map((cart) => {
                                return (
                                  <>
                                    <tr>
                                      <td>{cart.productName}</td>
                                      <td>{cart.quantity}</td>
                                      <td>N{cart.price}</td>
                                    </tr>
                                  </>
                                );
                              })}
                          </table>
                        </td>
                        <td className="py-2 px-4">
                          <Chip
                            variant={variants[order.status]}
                            value={order.status}
                          />
                        </td>
                        <td className="py-2 px-4">
                          <Link href={`/orders/${order.orderId}`}>View</Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RecentOrders;
