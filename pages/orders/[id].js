import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../../styles/orders.module.css";
import Footer from "../../components/Footer";
import MainPageNav from "../../components/mainPageNavbar/mainPageNav";
import { getLoggedInUser, logOutUser } from "../../services/user";
import { getOrderById } from "../../services/order";
import toast, { Toaster } from "react-hot-toast";

const Order = () => {
  const router = useRouter();
  const { id } = router.query;
  //alert(JSON.stringify(router.query));
  const status = 0;
  const statusClass = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };

  const [user, setUser] = useState(null);
  const [order, setOrder] = useState(null);

  const variants = {
    processing: "ghost",
    pending: "ghost",
    completed: "ghost",
  };

  const handleGetOrder = async () => {
    try {
      if (id === undefined || id === null) return;
      const response = await getOrderById(id);
      setOrder(response.orderData);
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
    handleGetOrder();
  }, [user, id]);

  return (
    <div>
      <MainPageNav />
      <div className="p-[50px] flex lg:pt-[8%] md:pt-[10%] sm:pt-[12%] px-[6%] min-h-screen">
        <div className="flex-[2]">
          <div className="">
            {order !== null && (
              <table className="w-full border-collapse text-left  text-black">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Address</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="font-normal">{order.orderId}</span>
                    </td>
                    <td>
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
                    </td>
                    <td>
                      <span>{order.address}</span>
                    </td>
                    <td>
                      <span className="font-medium">
                        NGN {order.amountCharged}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>

          <div className=" last:flex last:justify-between w-[80%] pt-[10%]  text-black">
            <div
              className={
                order !== null &&
                (order?.status === "pending" ||
                  order?.status === "processing" ||
                  order?.status === "delivering" ||
                  order?.status === "completed") &&
                statusClass(0)
              }
            >
              <Image src="/Paid.png" width={30} height={30} />
              <span>Payment</span>
              <div className={styles.checkedIcon}>
                {order !== null &&
                  (order?.status === "pending" ||
                    order?.status === "processing" ||
                    order?.status === "delivering" ||
                    order?.status === "completed") && (
                    <Image
                      className={styles.checkedIcon}
                      src="/checkedIcon.png"
                      width={20}
                      height={20}
                    />
                  )}
              </div>
            </div>
            <div
              className={
                order !== null &&
                (order.status === "processing" ||
                  order.status === "delivering" ||
                  order.status === "completed")
                  ? statusClass(0)
                  : statusClass(1)
              }
            >
              <Image src="/cooking.png" width={30} height={30} />
              <span>Preparing</span>
              <div className={styles.checkedIcon}>
                {order !== null &&
                  (order.status === "processing" ||
                    order.status === "delivering" ||
                    order.status === "completed") && (
                    <Image
                      className={styles.checkedIcon}
                      src="/checkedIcon.png"
                      width={20}
                      height={20}
                    />
                  )}
              </div>
            </div>
            <div
              className={
                order !== null &&
                (order?.status === "delivering" ||
                  order?.status === "completed")
                  ? statusClass(0)
                  : (order?.status === "processing"
                  ? statusClass(1)
                  : statusClass(2))
              }
            >
              <Image src="/fast-delivery.png" width={30} height={30} />
              <span>On The Way</span>
              <div className={styles.checkedIcon}>
                {order !== null &&
                  (order?.status === "delivering" ||
                    order?.status === "completed") && (
                    <Image
                      className={styles.checkedIcon}
                      src="/checkedIcon.png"
                      width={20}
                      height={20}
                    />
                  )}
              </div>
            </div>
            <div
              className={
                order !== null && order?.status === "completed"
                  ? statusClass(0)
                  : (order?.status === "delivering"
                  ? statusClass(1)
                  : statusClass(2))
              }
            >
              <Image src="/delivered.png" width={30} height={30} />
              <span>Delivered</span>
              <div className={styles.checkedIcon}>
                {order !== null && order?.status === "completed" && (
                  <Image
                    className={styles.checkedIcon}
                    src="/checkedIcon.png"
                    width={20}
                    height={20}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className=" flex-[1]  text-black">
          <div className="w-full max-w-md bg-amber-100 p-8 flex flex-col justify-between mt-10">
            <h2 className="text-2xl font-bold mb-4">CART TOTAL</h2>
            <div className="mb-2">
              <b className="mr-[10px]">Subtotal:</b> NGN{" "}
              {order !== null && (order.amountCharged/100)}
            </div>
            <div className="mb-2">
              <b className="mr-[10px]">Discount:</b> $0.00
            </div>
            <div className="mb-2">
              <b className="mr-[10px]">Total:</b> NGN{" "}
              {order !== null && (order.amountCharged/100)}
            </div>
            <button
              disabled
              className="bg-[#A1C75C] text-white py-2 px-4 rounded-md cursor-not-allowed font-medium h-[30px] mt-[20px]"
            >
              {order?.status}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Order;
