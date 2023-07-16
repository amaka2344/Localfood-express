import { React, useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Logo from "./logo";
import Image from "next/image";
import logoPic from "../public/icon.png";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import MenuDropdown from "./MenuDropdown";
import { getVendor, getLoggedInUser, logOutUser } from "../services/user";
import { getCartsByUserId } from "../services/cart";
import { BsPerson } from "react-icons/bs";

const NavBar = () => {
  const router = useRouter();
  const [carts, setCarts] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [colorChange, setColorChange] = useState(false);
  const [user, setUser] = useState(null);

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

  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownClose = () => {
    setIsOpen(false);
  };

  const logOut = async () => {
    await logOutUser();
    router.push("/login");
  };

  useEffect(() => {
    handleCheckLogin();
  }, []);

  return (
    <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm">
      <nav
        className={`flex flex-col sm:flex-row py-3 max-w-screen mb-3 fixed bg-white left-0 right-0 px-[4%] md:px-[10%] ${
          colorChange ? "shadow-sm  drop-shadow-sm" : ""
        } z-10 transition delay-75 ease-in-out`}
      >
        <div className="flex justify-between w-full items-center">
          <section className="relative flex items-center">
            <Link href="/" className=" cursor-pointer">
              <a>
                <Image src={logoPic} alt="logo pic" width={45} height={40} />
              </a>
            </Link>
            <Logo />
          </section>

          {user === null && (
            <div className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block">
              <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:items-center md:justify-end md:gap-y-0 md:gap-x-7 md:mt-0 md:pl-7">
                <Link href="/register">
                  <a className="flex items-center gap-x-2 font-medium text-black hover:text-[#A1C75C] md:my-6 md:pl-6">
                    Register
                  </a>
                </Link>
                <Link href="/login">
                  <a className="flex items-center font-medium text-black hover:text-[#A1C75C]  md:border-gray-300 md:my-6 md:pl-2 md:pr-6">
                    Login
                  </a>
                </Link>
                <Link href="/admin/">
                  <a>
                    <button className="bg-[#A1C75C] text-white py-2 px-4 rounded-md cursor-pointer font-medium h-[30px] mr-8">
                      Register as a Restaurant
                    </button>
                  </a>
                </Link>
              </div>
            </div>
          )}

          <section className="flex items-center text-black">
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
            {user !== null && (
            <button onClick={handleDropdownToggle}>
              <ul className="hidden md:flex justify-between text-2xl">
                <li className="relative p-2 pt-0 rounded-full hover:bg-[#cae39b] cursor-pointer mx-2 transition">
                  <BsPerson color="gray" />
                </li>
              </ul>
            </button>
          )}
            {user !== null && isOpen && (
              <div className="absolute top-0 right-0 mt-8 mr-8 w-48 bg-white shadow-lg rounded-lg">
                <ul className="py-2">
                  <Link href="/editProfile ">
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={handleDropdownClose}
                    >
                      <a>Edit Profile</a>
                    </li>
                  </Link>

                  <Link href="/orders/recentOrders">
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={handleDropdownClose}
                    >
                      <a>Recent Orders</a>
                    </li>
                  </Link>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={logOut}
                  >
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            )}

            <section className="md:hidden cursor-pointer relative">
              <RxHamburgerMenu
                className="text-lg"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
              {isMenuOpen && <MenuDropdown />}
            </section>
          </section>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
