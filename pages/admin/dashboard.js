import Image from "next/image";
import React, { useState, useEffect } from "react";
import TopNav from "../../components/adminTopNav";
import Link from "next/link";

const Dashboard = () => {
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

          {/** add the product button */}
         
          </div>
        </div>
    </>
  );
};

export default Dashboard;
