import Image from 'next/image';
import React, { useState } from 'react';
import spagetti from '../../public/spagetti.jpg';
import TopNav from '../../components/adminTopNav';
import Link from 'next/link'
import { Chip } from '@material-tailwind/react'

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddProduct = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <>
      <div className="flex h-screen">
        {/* Left-hand side navigation */}
        <div className="flex flex-col bg-gray-200 w-[20%] md:w-[12%] text-black pt-[50px]">
          <h1 className='text-center pt-8 font-bold text-2xl'>
            Local food-express
          </h1>
          <ul className="flex flex-col mt-8">
            <li className="py-2 px-4 hover:bg-gray-300">
              <Link href='/'>
                <a className="flex items-center">
                  <span className="w-6 h-6 mr-2">
                    {/* Add your navigation icon here */}
                  </span>
                  Dashboard
                </a>
              </Link>
            </li>
            <li className="py-2 px-4 hover:bg-gray-300">
              <Link href='/'>
                <a className="flex items-center">
                  <span className="w-6 h-6 mr-2">
                    {/* Add your navigation icon here */}
                  </span>
                  Products
                </a>
              </Link>
            </li>
            <li className="py-2 px-4 hover:bg-gray-300">
              <Link href='/'>
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
          <div className="flex justify-between items-center p-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleAddProduct}
            >
              Add Product
            </button>
          </div>

           {/** modal */}
           {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-10 text-black">
              <div className="bg-white rounded-lg p-6 w-96 z-50">
                <h2 className="text-lg font-bold mb-4">Add Product</h2>
                <form onSubmit={handleSubmit}>
                  {/* Product Name */}
                  <div className="mb-4">
                    <label htmlFor="productName" className="block mb-2">
                      Product Name
                    </label>
                    <input
                      type="text"
                      id="productName"
                      className="border-gray-300 border p-2 w-full"
                    // Add any required validation or state handling
                    />
                  </div>

                  {/* Description */}
                  {/* Add other form fields here */}

                  {/* Save Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
              <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={handleCloseModal}
              ></div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black p-4">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold mb-4">Products</h1>
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-4">Image</th>
                    <th className="py-2 px-4">Id</th>
                    <th className="py-2 px-4">Product Name</th>
                    <th className="py-2 px-4">Price</th>
                    <th className="py-2 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4">
                      <div className="w-16 h-16">
                        <Image
                          width={50}
                          height={50}
                          src={spagetti}
                          objectFit="cover"
                          alt=""
                        />
                      </div>
                    </td>
                    <td className="py-2 px-4">cloth...</td>
                    <td className="py-2 px-4">ffff</td>
                    <td className="py-2 px-4">$500</td>
                    <td className="py-2 px-4">
                      <button className="bg-green-500 text-white px-3 py-1 rounded mr-2">
                        more
                      </button>
                      <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded" disabled>
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
                      <Chip variant='ghost' value='Processing' />
                    </td>
                    <td className="py-2 px-4">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded" disabled>
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

export default Dashboard;
