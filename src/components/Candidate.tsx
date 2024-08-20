'use client';

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import Timer from "@/components/Timer";

export default function Candidate({time, examName, instituteCode}: {time: string, examName: string, instituteCode: string}) {
    const {user} = useKindeBrowserClient();
    const [candidate, SetCandidate] = useState<any>('')
    console.log(user);
    return (
        <div className="flex flex-row justify-between px-10 pb-2 mt-2 border-b-2">
            <div className="flex flex-row justify-between items-center gap-4">
                <div className="">
                    <Image src="/image/Exam/default_user.png" alt="Candidate Image" width={95} height={95}/>
                </div>
                <div className="flex flex-col items-start font-medium">
                    <div><h2>Candidate Name: {user?.given_name} {user?.family_name}</h2></div>
                    {/* <div><h2>Exam Name: {candidate.exam}</h2></div> */}
                    <div><h2>Exam Name: {examName}</h2></div>
                    <div><h2>Institute Code: {instituteCode}</h2></div>
                    <div><h2>Remaining Time: {<Timer time={time}/>} </h2></div>
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