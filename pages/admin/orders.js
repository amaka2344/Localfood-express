import Image from "next/image";
import React, { useState, useEffect } from "react";
import TopNav from "../../components/adminTopNav";
import Link from "next/link";
import { Chip } from "@material-tailwind/react";
import { getLoggedInUser } from "../../services/user";
import { addUnit, getAllUnits } from "../../services/units";
import {
  getProductsByVendor,
  updateProduct,
  createProduct,
  deleteProduct,
} from "../../services/product";
import toast, { Toaster } from "react-hot-toast";

const Orders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [productList, setProductList] = useState([]);
  const [units, setUnits] = useState([]);
  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("Add Product");
  const [edit, setEdit] = useState(false);
  const [product, setProduct] = useState({
    productName: "",
    description: "",
    price: "",
    unitId: "",
    stockQuantity: "",
    packagingTime: "30",
    published: "on",
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  
  return (
    <>
      <div className="flex h-screen">
        {/* Left-hand side navigation */}
        <div className="flex flex-col bg-gray-200 w-[20%] md:w-[12%] text-black pt-[50px]">
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
            {/* Add more navigation links here */}
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
                    <th className="py-2 px-4">Payment</th>
                    <th className="py-2 px-4">Status</th>
                    <th className="py-2 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4">dfmfk...</td>
                    <td className="py-2 px-4">skvjfdv</td>
                    <td className="py-2 px-4">$500</td>
                    <td className="py-2 px-4">fjvjvj</td>
                    <td className="py-2 px-4">
                      <Chip variant="ghost" value="Processing" />
                    </td>
                    <td className="py-2 px-4">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Next Stage
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
