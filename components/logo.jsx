import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <Link href='/'>
      <a className='pt-1 pl-2 text-2xl text-black font-bold hover:text-[#A1C75C] cursor-pointer transition hidden md:flex'>
       LOCAL FOOD-EXPRESS
      </a>
    </Link>

  )
}

export default Logo