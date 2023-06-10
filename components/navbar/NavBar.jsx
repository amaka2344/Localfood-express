'use client'
import React, { useState } from 'react'
import Logo from './logo'
import Image from 'next/image'
import logoPic from '../../public/icon.png'
import Link from 'next/link'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx'
import MenuDropdown from '../navbar/MenuDropdown'


const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [colorChange, setColorChange] = useState(false);
  return (
    <nav
      className={`flex flex-col sm:flex-row py-3 max-w-screen mb-3 fixed left-0 right-0 px-[4%] md:px-[10%] ${colorChange ? "shadow-sm  drop-shadow-sm" : ""
        } z-10 transition delay-75 ease-in-out`}
    >
      <div className="flex justify-between w-full items-center">
        <section className="relative flex items-center">
          <Link href='/' className=' cursor-pointer'>
            <Image src={logoPic} alt='logo pic' width={50} height={50} />
          </Link>
          <Logo />
        </section>

        <section className="flex items-center">
          <Link href='/register'
            className='mx-4 px-4 py-1 shadow-sm rounded-md text-black text-sm transition bg-[#A1C75C] hover:text-white'
          >
            <span className='xs:block'>REGISTER</span>
          </Link>
          <Link href='/login'
            className='mx-4 px-4 py-1 shadow-sm rounded-md text-black text-sm transition outline outline-1 outline-[#A1C75C] hover:bg-[#A1C75C] hover:text-white'
          >
            <span className='xs:block'>LOG IN</span>
          </Link>
          <Link href='/'>
            <ul className='hidden md:flex justify-between text-2xl'>
              <li className='relative p-2 rounded-full hover:bg-[#FBDEB7] hover:text-black cursor-pointer mx-2 transition shadow-sm'>
                <AiOutlineShoppingCart />
              </li>
              <div className='absolute bottom-[5px] right-[10%] w-5 h-5 border- rounded-full bg-amber-100 p-3 flex justify-center items-center'>
              2
            </div>
            </ul>
           
          </Link>
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


  )

}

export default NavBar