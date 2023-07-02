import React from 'react'
import {
    Typography
} from '@material-tailwind/react'
import { BiPlus } from 'react-icons/bi'
import Image from 'next/image'
import spagetti from '../../public/spagetti.jpg'
import MainPageNav from '../../components/mainPageNavbar/mainPageNav'
import Footer from '../../components/Footer'

const RestaurantId = () => {
    return (
        <>
        <MainPageNav/>
        <div className="pt-[6%]">
            <Image
                className="w-full"
                height={300}
                src={spagetti}
                alt="spaghetti banner"
            />
            <figure className="relative">
                <figcaption className="absolute bottom-8 left-2/4 transform -translate-x-2/4 sm:flex sm:justify-between bg-white py-4 px-6 sm:w-[calc(100%-4rem)] sm:saturate-200 sm:backdrop-blur-sm">
                    <div className="flex flex-col text-black">
                        <Typography variant="h5" color="black">
                            restaurant 1
                        </Typography>
                        <Typography color="black" className="mt-2 font-normal">
                            address
                        </Typography>
                    </div>
                    <Typography variant="h5" color="black" className="mt-2 sm:mt-0">
                        10-20 min
                    </Typography>
                </figcaption>
            </figure>

            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        <div className="p-4 lg:w-1/2 md:w-full">
                            <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
                                <div className="w-[20%] sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center flex-shrink-0">
                                    <Image src={spagetti} alt="Food" className="w-12 h-12" />
                                </div>
                                <div className="flex-grow">
                                    <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Roasted Yam And Plantain</h2>
                                    <p className="leading-relaxed text-base">Food description goes here.</p>
                                    <div className="flex items-center mt-3 justify-end">
                                        <p className="ml-2 text-amber-500 pr-8 font-bold">&#x20A6;500</p>
                                        <button className="bg-[#A1C75C] hover:bg-[#A1C75C] text-white font-bold py-2 px-4 rounded">
                                            <BiPlus />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 lg:w-1/2 md:w-full">
                            <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
                                <div className="w-[20%] sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center flex-shrink-0">
                                    <Image src={spagetti} alt="Food" className="w-12 h-12"/>
                                </div>
                                <div className="flex-grow">
                                    <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Food Name</h2>
                                    <p className="leading-relaxed text-base">Food description goes here.</p>
                                    <div className="flex items-center mt-3 justify-end ">
                                        <p className="ml-2 text-amber-500 pr-8">Food Price</p>
                                        <button className="bg-[#A1C75C] hover:bg-[#A1C75C] text-white font-bold py-2 px-4 rounded">
                                            <BiPlus />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <Footer />
        </>
    )
}

export default RestaurantId