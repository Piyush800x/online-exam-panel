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
import { UserRoundPlus, LogIn, LogOut } from 'lucide-react';
import Searchbar from './SearchBar';

export default function NavBar() {
  const {isAuthenticated} = useKindeBrowserClient();

  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <nav className="sticky top-0 bg-zinc-700 max-h-200 border-b flex items-center text-white z-50">
      <div className="flex justify-between items-center h-full w-full px-4 py-2 2xl:px-16">
        <Link href="/">
          <h1 className='text-2xl font-semibold'>ExamFile<span className="text-lg">.com</span></h1>
        </Link>
        <div className='text-black w-1/5'>
          <Searchbar/>
        </div>
        <div className="flex gap-2 items-center">
          <Link href="/" className='text-white hover:transition ease-in-out hover:bg-white hover:rounded-md p-1 hover:text-slate-900 text-lg'>
            Home
          </Link> 
          <Link href="/instructions" className='text-white hover:transition ease-in-out hover:bg-white hover:rounded-md p-1 hover:text-slate-900 text-lg'>
            Instructions
          </Link> 
          <Link href="/institution" className='text-white hover:transition ease-in-out hover:bg-white hover:rounded-md p-1 hover:text-slate-900 text-lg'>
            Institute
          </Link>
        </div>
        <div className='m-3 flex justify-between'>
          <ul className='flex items-center gap-2'>
            <div className={
              !isAuthenticated ? "hidden" : "flex"
            }>
              <LogoutLink className='text-white hover:transition ease-in-out hover:bg-white hover:rounded-md p-1 hover:text-slate-900 text-lg flex gap-1 items-center'><LogOut className="size-5"/>Logout</LogoutLink>
            </div>
            <div className={
              isAuthenticated ? "hidden" : "flex"
            }>
              <Drawer>
                  <DrawerTrigger asChild>
                    <button className='text-white hover:transition ease-in-out hover:bg-white hover:rounded-md p-1 hover:text-slate-900 text-lg flex gap-1 items-center'><UserRoundPlus className="size-5"/>Register</button>
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
                    <button className='text-white hover:transition ease-in-out hover:bg-white hover:rounded-md p-1 hover:text-slate-900 text-lg flex gap-1 items-center'><LogIn className="size-5"/>Login</button>
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
