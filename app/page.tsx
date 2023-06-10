import { BsGeo } from 'react-icons/bs'
import Link from 'next/link'
import soup from '../public/soup-removebg-preview.png'
import soup2 from '../public/soup.png'
import Image from 'next/image'
import logo11 from '../public/logo11.png'
import logo12 from '../public/logo12.png'
import logo13 from '../public/logo13.png'
import { FiThumbsUp } from 'react-icons/fi'




export default function Home() {
  return (
    <div>
      <div className="flex justify-between items-center py-1  px-[4%] md:px-[6%]" >
        <section className="max-w-xl mx-auto sm:mx-0 w-full lg:w-1/3 sm:mt-[20%] pb-[15%]">
          <h1 className=" text-6xl sm:text-7xl lg:text-6xl font-semibold  w-full">
            Savor the Best Local Cuisine <span className="font-bold text-[#A1C75C]">at Your Doorstep</span>
          </h1>
          <p className="py-3 text-md  text-gray-600">
            Order Healthy and Tasty Intercontinental Food Online
            <br />
            Wherever and Whenever from <span className="font-bold text-[#A1C75C]">LOCAL FOOD-EXPRESS</span>
          </p>
          <div className="flex pt-5">
            <div className='bg-amber-100 rounded w-15'>
              <BsGeo className='text-[25px] pt-1 ' />
            </div>
            <input type="text" placeholder="Enter your Delivery Address" className="border-none bg-gray-100 w-[70%] rounded p-2 " />
          </div>
        </section>
        <div className="hidden w-1/2 lg:flex justify-end">
          <Image src={soup} alt="heroImg" className="w-2/3 h-full" />
        </div>
      </div>

      <section>
        <div className="py-[50px] px-[8%] mt-8 bg-amber-50 flex gap-2 md:gap-10 right-0 left-0 justify-center items-center text-center">
          <div>
            <Image src={logo11} alt='logo11' className='w-[100px]' />
            <h3>
              Browse, Choose, and Order
            </h3>
            <p className='text-gray-500 font-light'>
              Explore our curated selection of local restaurants
              <br /> and their enticing menus.
            </p>
          </div>
          <div>
            <Image src={logo12} alt='logo11' className='w-[100px]' />
            <h3>Secure and Seamless Transactions</h3>
            <p className='text-gray-500 font-light'>
              Make payments hassle-free using your preferred method,
              <br /> whether it's credit card, digital wallet, or cash on delivery.
            </p>
          </div>
          <div>
            <Image src={logo13} alt='logo11' className='w-[100px]' />
            <h3>
              Swift Delivery to Your Doorstep
            </h3>
            <p className='text-gray-500 font-light' >
              Once your order is placed, sit back and relax.
              <br /> Our trusted delivery partners will swiftly pick up your food
              <br />from the restaurant and ensure it reaches your doorstep with care.
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4 mt-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl  break-words flex items-center ">
          Stores You Might Like
        </h1>
        <Link href='#'>
          <div className=" flex aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <Image
              src={soup}
              alt='soup'
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <span aria-hidden="true" className=" inset-0" />
                view
              </h3>
              <p className="mt-1 text-sm text-gray-500">cloth</p>
            </div>
            <p className="text-sm font-medium text-gray-900">500</p>
          </div>
        </Link>


        <Link href='#'>
          <div className=" flex aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <Image
              src={soup}
              alt='soup'
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <span aria-hidden="true" className=" inset-0" />
                view
              </h3>
              <p className="mt-1 text-sm text-gray-500">cloth</p>
            </div>
            <p className="text-sm font-medium text-gray-900">500</p>
          </div>
        </Link>

        <Link href='#'>
          <div className=" flex aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <Image
              src={soup}
              alt='soup'
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <span aria-hidden="true" className=" inset-0" />
                view
              </h3>
              <p className="mt-1 text-sm text-gray-500">cloth</p>
            </div>
            <p className="text-sm font-medium text-gray-900">500</p>
          </div>
        </Link>
      </section>
    </div>
  )
}
 