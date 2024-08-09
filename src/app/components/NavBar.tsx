"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai'; 
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

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
          <h1 className='text-3xl font-normal'>Online Exam</h1>
        </Link>
        <div className='m-3 hidden sm:flex content-center'>
          <ul className='flex items-center'>
            <Link href="/">
              <li className='text-Grite-200 hover:text-white text-xl'>Home</li>
            </Link> 
            <Link href="/instructions">
              <li className='ml-4 text-Grite-200 hover:text-white text-xl'>Instructions</li>
            </Link> 
            <Link href="/institution/dashboard">
              <li className='ml-4 text-Grite-200 hover:text-white text-xl'>Institute</li>
            </Link>
            <Link href='/exam/jee'>
              <li className='ml-4 text-Grite-200 hover:text-white text-xl'>Exam</li>
            </Link>
            {/* <Link href="/results">
              <li className='ml-4 text-Grite-200 hover:text-white text-xl'>Results</li>
            </Link> */}
            <div className={
              !isAuthenticated ? "hidden" : "flex"
            }>
              <LogoutLink className='ml-4 text-Grite-200 hover:text-white text-xl'>Logout</LogoutLink>
            </div>
            {/* <div className={
              isAuthenticated ? "hidden" : "flex"
            }>
              <RegisterLink className='ml-4 text-Grite-200 hover:text-white text-xl'>Register</RegisterLink>
              <LoginLink className='ml-4 text-Grite-200 hover:text-white text-xl'>Login</LoginLink>
            </div> */}
            <div className={
              isAuthenticated ? "hidden" : "flex"
            }>
              <Drawer>
                  <DrawerTrigger asChild>
                    <button className='ml-4 text-Grite-200 hover:text-white text-xl'>Register</button>
                  </DrawerTrigger>
                  <DrawerContent className='flex flex-col items-center'>
                    <DrawerTitle className='my-4 text-2xl'>Register as</DrawerTitle>
                    <div>
                      <div className='flex gap-2 mb-2 w-max'>
                        <Button className='px-7'><RegisterLink>Candidate</RegisterLink></Button>
                        <Button className='px-8'><RegisterLink role='teacher'>Institute</RegisterLink></Button>
                      </div>
                      <div>
                        <DrawerClose asChild>
                          <Button variant="outline" className='mb-4 w-full'>Cancel</Button>
                        </DrawerClose>
                      </div>
                    </div>
                  </DrawerContent>
              </Drawer>
            </div>
            <div className={
              isAuthenticated ? "hidden" : "flex"
            }>
              <Drawer>
                  <DrawerTrigger asChild>
                    <button className='ml-4 text-Grite-200 hover:text-white text-xl'>Login</button>
                  </DrawerTrigger>
                  <DrawerContent className='flex flex-col items-center'>
                    <DrawerTitle className='my-4 text-2xl'>Login as</DrawerTitle>
                    <div>
                      <div className='flex gap-2 mb-2 w-max'>
                        <Button className='px-7'><LoginLink role='student'>Candidate</LoginLink></Button>
                        <Button className='px-8'><LoginLink role='teacher'>Institute</LoginLink></Button>
                      </div>
                      <div>
                        <DrawerClose asChild>
                          <Button variant="outline" className='mb-4 w-full'>Cancel</Button>
                        </DrawerClose>
                      </div>
                    </div>
                  </DrawerContent>
              </Drawer>
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
