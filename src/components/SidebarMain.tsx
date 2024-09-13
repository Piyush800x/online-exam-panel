"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconArrowLeft,
} from "@tabler/icons-react";
import { PlusIcon, Pencil1Icon, ReaderIcon, TrashIcon } from '@radix-ui/react-icons'
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import AddQuestions from "./AddQuestions";
import EditQuestion from "./EditQuestion";
import EvaluateResults from "./EvaluateResult"
import { ScrollArea } from "@/components/ui/scroll-area"

export function SidebarMain() {
    const [open, setOpen] = useState(false);
    const [activeComponent, setActiveComponent] = useState<any>("Dashboard");
    
    const links = [
        {
            label: "Add Questions",
            href: "#",
            icon: (
                <PlusIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
            ),
            component: "AddQuestions"
        },
        {
            label: "Edit Questions",
            href: "#",
            icon: (
                <Pencil1Icon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            component: "EditQuestion",
        },
        {
            label: "Evaluate Results",
            href: "#",
            icon: (
                <ReaderIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            component: "EvaluateResults",
        },
    ];

    const renderComponent = () => {
        switch (activeComponent) {
            case "AddQuestions":
                return <AddQuestions />;
            case "EditQuestion":
                return <EditQuestion/>
            case "EvaluateResults":
                return <EvaluateResults/>
            default:
                return <AddQuestions />;
        }
    };

    return (
        <div
            className={cn(
                "rounded-md flex flex-col py-4 my-4 md:flex-row w-full h-full overflow-hidden",
                "h-max" // for your use case, use `h-dvh` instead of `h-[60vh]`
            )}
        >
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 h-auto overflow-y-visible overflow-x-hidden">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink
                                    key={idx}
                                    link={link}
                                    onClick={() => setActiveComponent(link.component)} // Pass onClick to handle component switching
                                />
                            ))}
                        </div>
                    </div>
                </SidebarBody>
                {/* <div className="flex-1 overflow-y-hidden"> */}
                    
                {/* </div> */}
            </Sidebar>

            <ScrollArea className="rounded-md border py-4 w-full h-lvh overflow-y-auto">
                {renderComponent()}
            </ScrollArea>

        </div>
    );
}

export const Logo = () => {
    const shopName = localStorage.getItem("shopName");
    return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        {shopName || ""}
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};