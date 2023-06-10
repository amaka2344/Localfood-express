import {React,  useState } from 'react'
import icon from '../../../public/icon.png'
import Image from 'next/image'
import Link from 'next/link'

function Register() {
 //input usestate
 const [username, setUsername] = useState('')
 const [password, setPassword] = useState('')
 const [email, setEmail] = useState('')
 //input usestate stops here

 //validation usestate
 const [error, setError] = useState({})
  return (
    <div className='text-center px-[4%] justify-center items-center md:px-[6%] pt-[10%]'>
      <div className='items-center justify-center flex pb-10'>
        <Image src={icon} alt='icon' width={100} height={100} />
      </div>
      <div>
        <h1 className=' font-bold text-3xl'>
          Welcome to Local Food-Express
        </h1>
        <p>
          Fill in the details to log in or create a Local Food-Express Account
        </p>
      </div>

    </div>
  )
}

export default Register