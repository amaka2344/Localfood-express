import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import TopNav from "../../components/adminTopNav";
import Link from "next/link";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { getLoggedInUser, logOutUser } from "../../services/user";
import {
  getOrdersByVendorId,
  getTotalPendingOrders,
} from "../../services/order";
import { getTotalProducts, getProductsByVendor } from "../../services/product";
import toast, { Toaster } from "react-hot-toast";
Chart.register(...registerables);

const Dashboard = () => {
  const router = useRouter();
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [recentProducts, setRecentProducts] = useState([]);
  const [orderStatistics, setOrderStatistics] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [user, setUser] = useState(null);

  const handleGetOrders = async () => {
    try {
      if (user.uid === undefined) return;
      const response = await getOrdersByVendorId(user.uid);
      setRecentOrders(response.orders);
    } catch (error) {
      toast.error("error");
    }
  };

  const handleGetTotalProducts = async () => {
    try {
      if (user.uid === undefined) return;
      const response = await getTotalProducts(user.uid);
      setProductCount(response.count);
    } catch (error) {
      toast.error("error");
    }
  };

  const handleGetTotalPendingOrders = async () => {
    try {
      if (user.uid === undefined) return;
      const response = await getTotalPendingOrders(user.uid);
      setOrderCount(response.count);
    } catch (error) {
      toast.error("error");
    }
  };

  const handleGetProducts = async () => {
    try {
      if (user.uid === undefined) return;
      const response = await getProductsByVendor(user.uid);
      setRecentProducts(response.products);
    } catch (error) {
      toast.error("error");
    }
  };

  const handleCheckLogin = async () => {
    const user = await getLoggedInUser();
    if (!user || user.userType !== "vendor") {
      toast.error("Please login as vendor");
      router.push("/login");
    }
    setUser(user);
  };

  const logOut = async () => {
    await logOutUser();
    router.push("/login");
  };

  useEffect(() => {
    handleCheckLogin();
  }, []);

  useEffect(() => {
    handleGetOrders();
    handleGetTotalPendingOrders();
    handleGetTotalProducts();
    handleGetProducts();
    // Simulating API calls or data fetching

    setOrderStatistics([
      { day: "Monday", count: 150 },
      { day: "Tuesday", count: 200 },
      { day: "Wednesday", count: 180 },
      { day: "Thursday", count: 220 },
      { day: "Friday", count: 250 },
    ]);
  }, [user]);

  const orderLabels = orderStatistics.map((statistic) => statistic.day);
  const orderData = orderStatistics.map((statistic) => statistic.count);

  const chartData = {
    labels: orderLabels,
    datasets: [
      {
        label: "Number of Orders",
        data: orderData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category",
        labels: orderLabels,
        offset: true,
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: Math.max(...orderData) + 50,
      },
    },
  };

  return (
    <>
      <div className="flex h-[100%]]">
        {/* Left-hand side navigation */}
        <div className="flex flex-col bg-black w-[20%] md:w-[12%] text-white pt-[50px]">
          <h1 className="text-center pt-2 font-bold text-2xl">
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
            <li className="py-2 px-4 hover:bg-gray-300" onClick={logOut}>
              <a className="flex items-center">
                <span className="w-6 h-6 mr-2">
                  {/* Add your navigation icon here */}
                </span>
                Logout
              </a>
            </li>
            {/* Add more navigation links here */}
          </ul>
        </div>

        {/* Right-hand side content */}
        <div className="flex flex-col flex-1">
          <TopNav />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black p-4">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h2 className="text-xl font-bold mb-4">Total Products</h2>
              <div className="flex items-center mb-4">
                <span className="text-3xl font-bold mr-2">{productCount}</span>
                <span className="text-gray-500">product</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Recent Products</h3>
                <ul>
                  {recentProducts.length > 0 &&
                    recentProducts.map((product) => (
                      <li key={product.id} className="flex items-center mb-1">
                        <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                        <span>{product.productName}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h2 className="text-xl font-bold mb-4">Total Pending Orders</h2>
              <p className="text-3xl font-bold">{orderCount}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-md mt-4 text-black pt-10">
            <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4">Order ID</th>
                  <th className="py-2 px-4">Customer Name</th>
                  <th className="py-2 px-4">Items</th>
                  <th className="py-2 px-4">Amount</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.orderId} className="border-b">
                    <td className="py-2 px-4">{order.orderId}</td>
                    <td className="py-2 px-4">{order.customerName}</td>
                    <td className="py-2 px-4">
                      <table>
                        <thead>
                          <tr>
                          <th>Product Name</th>
                          <th>Qty</th>
                          <th>Price</th>
                          </tr>
                          
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
                    <td className="py-2 px-4">{order.amountCharged}</td>
                    <td className="py-2 px-4">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md h-[400px]">
            <h2 className="text-xl font-bold mb-4">Order Statistics</h2>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
