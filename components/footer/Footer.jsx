import React from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { AiOutlineLinkedin } from 'react-icons/ai'
import { AiOutlineTwitter } from 'react-icons/ai'

const Footer = () => {
  return (
    <div className="py-5 mt-3 bg-amber-50 flex justify-center items-center gap-2 md:gap-10 right-0 absolute left-0">
    <p>Eyesome made with 💜 by Sandhya </p>
    <p className="flex gap-3">
      <a href="https://github.com/SandhyaR1007">
        <AiFillGithub className="text-2xl text-gray-800" />
      </a>
      <a href="https://www.linkedin.com/in/sandhya-rajwanshi-a75b331b4/">
        {" "}
        <AiOutlineLinkedin className="text-2xl text-gray-800" />
      </a>
      <a href="https://twitter.com/SandhyaR1007">
        <AiOutlineTwitter className="text-2xl text-gray-800" />
      </a>
    </p>
  </div>
  )
}

export default Footer