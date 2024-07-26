'use client';

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export default function Candidate() {
    const [candidate, SetCandidate] = useState<any>('')

    return (
        <div className="flex flex-row justify-between px-10">
            <div className="flex flex-row justify-between items-center">
                <div className="border border-black">
                    <Image src="/image/Exam/candidate.jpg" alt="Candidate Image" width={50} height={50}/>
                </div>
                <div className="flex flex-col items-start">
                    <div><h2>Candidate Name: {candidate.name}</h2></div>
                    <div><h2>Exam Name: {candidate.exam}</h2></div>
                    <div><h2>Subject Name: {candidate.subject}</h2></div>
                    <div><h2>Remaining Time: </h2></div>
                </div>
            </div>
            <div className="pt-6">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button value="outline">Language</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>English</DropdownMenuItem>
                        <DropdownMenuItem>Bengali</DropdownMenuItem>
                        <DropdownMenuItem>Hindi</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}