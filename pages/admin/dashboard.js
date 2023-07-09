import React, { useState, useEffect } from 'react';
import TopNav from '../../components/adminTopNav';
import Link from 'next/link';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Dashboard = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [recentCustomers, setRecentCustomers] = useState([]);
  const [orderStatistics, setOrderStatistics] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      // Update the state with the base64 string
      setPhoto(base64String);
    };
    reader.readAsDataURL(file);
  }

  const handleAddProduct = () => {
    setIsModalOpen(true);
  };

  const handleDeleteProduct = () => {
    setIsDeleteModalOpen(true);
  };

  const handleViewProduct = () => {
    setIsViewModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      product["deleted"] = true;
      const response = await deleteProduct(product.id, product);
      setLoading(false);
      if (response.hasOwnProperty("success") && response.success) {
        toast.success(response.message);
        handleGetProductsByVendor();
        handleCloseDeleteModal();
      } else {
        toast.error("Oops!!, failed to delete product");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    // Retrieve the form data
    try {
      const formData = new FormData(e.target);

      const newProduct = {
        productName: formData.get("productName"),
        description: formData.get("description"),
        price: formData.get("price"),
        unitId: formData.get("unitId"),
        stockQuantity: formData.get("stockQuantity"),
        packagingTime: formData.get("packagingTime"),
        published: formData.get("published") === "on",
        photo,
        userId: user.uid,
        deleted: false,
      };
      setLoading(true);
      const response = edit
        ? await updateProduct(product.id, newProduct)
        : await createProduct(newProduct);
      setLoading(false);
      if (response.hasOwnProperty("success") && response.success) {
        edit
          ? toast.success(response.message)
          : toast.success(response.message);
      } else {
        toast.error("Oops!!, product creation failed");
      }
      handleGetProductsByVendor();
      setEdit(false);
      //close the modal
      handleCloseModal();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGetUnits = async () => {
    // Perform form submission logic here
    try {
      /*const unitData = {
        name: "Wrap",
        abbreviation: "Wrap",
      };
      const response = await addUnit(unitData);*/
      const response = await getAllUnits();
      setUnits(response.units);
    } catch (error) {
      toast.error("error");
    }
  };

  const handleGetProductsByVendor = async () => {
    try {
      const response = await getProductsByVendor(user.uid);
      setProductList(response.products);
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
    // Simulating API calls or data fetching
    setCustomerCount(500);
    setOrderCount(1000);
    setOrderStatistics([
      { day: 'Monday', count: 150 },
      { day: 'Tuesday', count: 200 },
      { day: 'Wednesday', count: 180 },
      { day: 'Thursday', count: 220 },
      { day: 'Friday', count: 250 },
    ]);

    // Simulating recent customers data
    setRecentCustomers([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
      { id: 3, name: 'Michael Johnson' },
    ]);

    // Simulating recent orders data
    setRecentOrders([
      { orderId: 'ORD001', customerName: 'amaka', foodName: 'plantain and yam', price: 500, status: 'Delivered' },
      { orderId: 'ORD002', customerName: 'amaka', foodName: 'mallams tea', price: 100, status: 'Processing' },
      { orderId: 'ORD003', customerName: 'amaka', foodName: 'nwkobi', price: 800, status: 'Paid' },
      { orderId: 'ORD004', customerName: 'amaka', foodName: 'bread and akara', price: 600, status: 'On the way' },
    ]);
  }, []);

  const orderLabels = orderStatistics.map((statistic) => statistic.day);
  const orderData = orderStatistics.map((statistic) => statistic.count);

  const chartData = {
    labels: orderLabels,
    datasets: [
      {
        label: 'Number of Orders',
        data: orderData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,

      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category',
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

  useEffect(() => {
    handleGetProductsByVendor();
  }, [user]);

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
            {/* Add more navigation links here */}
          </ul>
        </div>

        {/* Right-hand side content */}
        <div className="flex flex-col flex-1">
          <TopNav />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black p-4">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h2 className="text-xl font-bold mb-4">Total Customers</h2>
              <div className="flex items-center mb-4">
                <span className="text-3xl font-bold mr-2">{customerCount}</span>
                <span className="text-gray-500">customers</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Recent Customers</h3>
                <ul>
                  {recentCustomers.map((customer) => (
                    <li key={customer.id} className="flex items-center mb-1">
                      <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                      <span>{customer.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h2 className="text-xl font-bold mb-4">Total Orders</h2>
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
                  <th className="py-2 px-4">Food Name</th>
                  <th className="py-2 px-4">Price</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.orderId} className="border-b">
                    <td className="py-2 px-4">{order.orderId}</td>
                    <td className='py-2 px-4'>{order.customerName}</td>
                    <td className="py-2 px-4">{order.foodName}</td>
                    <td className="py-2 px-4">{order.price}</td>
                    <td className="py-2 px-4">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md h-[400px]">
            <h2 className="text-xl font-bold mb-4">Order Statistics</h2>
            <Bar
              data={chartData}
              options={chartOptions}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
