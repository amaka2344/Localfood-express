"use client";
import React, { useState, useEffect } from "react";
import Logo from "../logo";
import Image from "next/image";
import logoPic from "../../public/icon.png";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsPerson } from "react-icons/bs";
import MainMenuDropdown from "../mainPageNavbar/mainManuDropdown";
import { getVendor, getLoggedInUser } from "../../services/user";
import { getCartsByUserId } from "../../services/cart";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [colorChange, setColorChange] = useState(false);
  const [carts, setCarts] = useState(0);
  const [user, setUser] = useState({});

  const handleCheckLogin = async () => {
    const user = await getLoggedInUser();
    if (user) {
      setUser(user);
      handleGetCart(user.uid);
    }
  };

  const handleGetCart = async (userId) => {
    try {
      const response = await getCartsByUserId(userId);
      if (response.hasOwnProperty("success") && response.success) {
        setCarts(response.cartItems.length);
      } else {
      }
    } catch (error) {}
  };

  useEffect(() => {
    handleCheckLogin();
  }, []);

  return (
    <nav
      className={`flex flex-col sm:flex-row py-3 max-w-screen mb-3 fixed left-0 right-0 px-[4%] md:px-[10%] ${
        colorChange ? "shadow-sm  drop-shadow-sm" : ""
      } z-10 transition delay-75 ease-in-out`}
    >
      <div className="flex justify-between w-full items-center">
        <section className="relative flex items-center">
          <Link href="/" className=" cursor-pointer">
            <Image src={logoPic} alt="logo pic" width={50} height={50} />
          </Link>
          <Logo />
        </section>

        <section className="flex items-center text-black">
          <Link href="/admin/">
            <a>
              <button className="hidden md:flex bg-[#A1C75C] text-white py-2 px-4 rounded-md cursor-pointer font-medium h-[30px] mr-8">
                Register as a Restaurant
              </button>
            </a>
          </Link>
          <Link href="/cart">
            <a>
              <ul className="hidden md:flex justify-between text-2xl">
                <li className="relative p-2 rounded cursor-pointer mx-2 transition ">
                  <span className=" inline-block">
                    <AiOutlineShoppingCart className="w-6 h-6 text-gray-500" />
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#A1C75C] rounded-full">
                      {carts}
                    </span>
                  </span>
                </li>
              </ul>
            </a>
          </Link>
          <Link href="/">
            <a>
              <ul className="hidden md:flex justify-between text-2xl">
                <li className="relative p-2 pt-0 rounded-full hover:bg-[#cae39b] cursor-pointer mx-2 transition">
                  <BsPerson color="gray" />
                </li>
              </ul>
            </a>
          </Link>
          <section className="md:hidden cursor-pointer relative">
            <RxHamburgerMenu
              className="text-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
            {isMenuOpen && <MainMenuDropdown />}
          </section>
        </section>
      </div>
    </nav>
  );
};

export default NavBar;
