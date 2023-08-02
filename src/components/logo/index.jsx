import Image from 'next/image'
import React from 'react'
import LogoImg from "../../assets/logo.png";

const Logo = () => {
  return (
    <div className="flex flex-row items-center gap-2">
        <Image
          src={LogoImg}
          alt="logo"
          height={"50"}
          width={"50"}
          className=""
        />
        <h1 className='font-bold text-xl text-cyan-500'>Cloud Storage</h1>
      </div>
  )
}

export default Logo