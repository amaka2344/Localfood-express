import Image from 'next/image';
import React, { useState } from 'react';
import spagetti from '../../public/spagetti.jpg';
import TopNav from '../../components/adminTopNav';
import Link from 'next/link'
import { Chip } from '@material-tailwind/react'

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [productList, setProductList] = useState([])

  const handleAddProduct = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSaveProduct = (e) => {
    e.preventDefault();
    // Retrieve the form data
    const formData = new FormData(e.target);
    const newProduct = {
      productName: formData.get('productName'),
      description: formData.get('description'),
      price: formData.get('price'),
      unitId: formData.get('unitId'),
      stockQuantity: formData.get('stockQuantity'),
      packagingTime: formData.get('packagingTime'),
      published: formData.get('published') === 'on',
      photo: formData.get('photo'),
    }
    //update the product list
    setProductList([...productList, newProduct])

    //close the modal
    handleCloseModal()
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
                <form onSubmit={handleSaveProduct}>
                  <div className="mb-4">
                    <input
                      type="file"
                      name='photo'
                      value={productList.photo}
                      className="border border-gray-300 p-2 w-full"
                      placeholder="Product Image"
                    />
                  </div>
                  {/* Product Name */}
                  <div className="mb-4">
                    <input
                      type="text"
                      name='productName'
                      value={productList.productName}
                      className="border border-gray-300 p-2 w-full"
                      placeholder="Product Name"
                    />
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <textarea
                      value={productList.description}
                      name='description'
                      className="border border-gray-300 p-2 w-full"
                      placeholder="Product Description"
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <input
                      value={productList.price}
                      name='price'
                      type="number"
                      className="border border-gray-300 p-2 w-full"
                      placeholder="Price"
                    />
                  </div>
                  <div className="mb-4">
                    <select className="border border-gray-300 p-2 w-full" value={productList.unitId} name='unitId'>
                      <option value="">Select Unit</option>
                      <option value=''>kg</option>
                      <option value=''>kg</option>
                      <option value=''>kg</option>
                      <option value=''>kg</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <input
                      value={productList.stockQuantity}
                      name='stockQuantity'
                      type="number"
                      className="border border-gray-300 p-2 w-full"
                      placeholder="Stock Quantity"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      name='packagingTime'
                      value={productList.packagingTime}
                      type="number"
                      className="border border-gray-300 p-2 w-full"
                      placeholder="Packaging Time"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        name='published'
                        value={productList.published}
                        type="checkbox"
                        className="mr-2"
                      />
                      Published
                    </label>
                  </div>
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
                  {productList.length > 0 ? (

                    productList.map((product, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-4">
                          <div className="w-16 h-16">
                            <Image
                              width={50}
                              height={50}
                              src={product.photo}
                              objectFit="cover"
                              alt=""
                            />
                          </div>
                        </td>
                        <td className="py-2 px-4">{index + 1}</td>
                        <td className="py-2 px-4">{product.productName}</td>
                        <td className="py-2 px-4">{product.price}</td>
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
                    ))

                  ) : (
                    <tr>
                      <td colSpan="5" className="py-2 px-4 text-center">
                        No products found.
                      </td>
                    </tr>
                  )}

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
