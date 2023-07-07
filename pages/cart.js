import React from 'react'
import Image from 'next/image'
import Footer from '../components/Footer'
import MainPageNav from '../components/mainPageNavbar/mainPageNav'
import { BiX } from 'react-icons/bi'

const cart = () => {
  return (
    <div>
      <MainPageNav />
      <div className="p-6 md:p-10 lg:p-16">
        <div className="flex flex-col md:flex-row lg:pt-[6%] md:pt-[10%] sm:pt-[12%]">
          <div className="md:w-2/3 ">
            <table className="w-full border-collapse text-left  text-black">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="relative">
                      <Image src="/spagetti.jpg" alt="Food" width={50} height={50} />
                    </div>
                  </td>
                  <td>
                    <span className="font-normal text-xl">Roasted Yam and Plantain</span>
                  </td>
                  <td>
                    <span>$1,23</span>
                  </td>
                  <td>
                    <span>1</span>
                  </td>
                  <td>
                    <span className="font-medium text-2xl">$500</span>
                  </td>
                  <td>
                    <button
                        className=" hover:bg-[#A1C75C] outline outline-1 outline-[#A1C75C] text-black hover:text-white font-bold py-2 px-4 rounded"
                    >
                      <BiX />
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div className="relative">
                      <Image src="/spagetti.jpg" alt="Food" width={50} height={50} />
                    </div>
                  </td>
                  <td>
                    <span className="font-normal text-xl  text-black">Roasted Yam and Plantain</span>
                  </td>
                  <td>
                    <span>$1,23</span>
                  </td>
                  <td>
                    <span>1</span>
                  </td>
                  <td>
                    <span className="font-medium text-2xl">$500</span>
                  </td>
                  <td>
                    <button
                      className=" hover:bg-[#A1C75C] outline outline-1 outline-[#A1C75C] text-black hover:text-white font-bold py-2 px-4 rounded"
                    >
                      <BiX />
                    </button>
                  </td>
                </tr>

              </tbody>

            </table>
          </div>
          <div className="md:w-1/3 mt-6 md:mt-0  text-black">
            <div className="w-full max-w-md bg-amber-100 p-8 flex flex-col justify-between">
              <h2 className="text-2xl font-bold mb-4">CART TOTAL</h2>
              <div className="mb-2">
                <b className='mr-[10px]'>Subtotal:</b> $700.00
              </div>
              <div className="mb-2">
                <b className='mr-[10px]' >Discount:</b> $0.00
              </div>
              <div className="mb-2">
                <b className='mr-[10px]'>Total:</b> $700.00
              </div>
              <button className="bg-[#A1C75C] text-white py-2 px-4 rounded-md cursor-pointer font-medium h-[30px] mt-[20px]">
                Checkout Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default cart