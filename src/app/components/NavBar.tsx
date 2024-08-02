"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai'; 
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";

export default function NavBar() {
  const {isAuthenticated} = useKindeBrowserClient();

  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-Grite-600 to-Grite-300 h-300 flex px-5 py-1 text-white">
      <div className="flex justify-between items-center h-full w-full m-4 px-4 2xl:px-16">
        <Link href="/">
          <Image
            src="/ntalogo1.png"
            alt="Logo"
            width={200}
            height={75}
            className="cursor-pointer rounded-lg shadow-xl bg-opacity-50"
            priority
          />
        </Link>
        <div className='m-3 hidden sm:flex'>
          <ul className='flex'>
            <Link href="/">
              <li className='text-Grite-200 hover:text-white text-xl'>Home</li>
            </Link> 
            <Link href="/instructions">
              <li className='ml-4 text-Grite-200 hover:text-white text-xl'>Instruction</li>
            </Link>
            <Link href='/exam/jee'>
              <li className='ml-4 text-Grite-200 hover:text-white text-xl'>Exam</li>
            </Link>
            <Link href="/results">
              <li className='ml-4 text-Grite-200 hover:text-white text-xl'>Results</li>
            </Link>
            <div className={
              isAuthenticated ? "hidden" : "flex"
            }>
              <RegisterLink className='ml-4 text-Grite-200 hover:text-white text-xl'>Register</RegisterLink>
              <LoginLink className='ml-4 text-Grite-200 hover:text-white text-xl'>Login</LoginLink>
            </div>
          </ul>
        </div>
        <div onClick={toggleNav} className='sm:hidden cursor-pointer pl-24'>
          <AiOutlineMenu className='text-3xl text-white' />
        </div>
      </div>
      <div className={
        navOpen 
        ? "fixed sm: hidden left-0 top-0 w-[65%] h-screen bg-gradient-to-r from-Grite-600 to-Grite-300 p-10 ease-in duration-500" 
        : "fixed left[-100%] top-0 p-10 ease-in duration-500"
      }>
      </div>
    </nav>
  );
}
