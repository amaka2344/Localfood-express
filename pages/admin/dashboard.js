import Image from 'next/image';
import React from 'react';
import spagetti from '../../public/spagetti.jpg';
import TopNav from '../../components/adminTopNav';

const Dashboard = ({ orders, products }) => {
  return (
    <>
      <TopNav />
      <div className="flex flex-col md:flex-row text-black">
        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold mb-4">Products</h1>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4">Image</th>
                <th className="py-2 px-4">Id</th>
                <th className="py-2 px-4">Title</th>
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
        <div className="md:w-1/2">
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
                <td className="py-2 px-4" ejrvj></td>
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
    </>
  );
};

export default Dashboard;
