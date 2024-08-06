'use client';
import Candidate from "@/app/components/Exam/Candidate";
import ExamBoard from "@/app/components/Exam/ExamBoard";
import NavBar from "@/app/components/NavBar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";

export default function ExamUi({params}: {params: {examname: string}}) {
  const [exam, setExam] = useState(false);
  const {isAuthenticated} = useKindeBrowserClient();
  
  if (!isAuthenticated) {
    return (
      <main className="flex flex-col  justify-center">
        <NavBar/>
        <h1 className="items-center text-center text-4xl">Please Register or Login to start exam.</h1>
      </main>
    )
  }

  console.log(`Page: ${params.examname}`)
  if (!exam) {
    return (
      <main className="flex flex-col">
        <NavBar/>
        <div className="flex flex-col items-center my-10">
          <label htmlFor="exam" className="text-3xl">Start Exam</label>
          <Button className="text-xl " onClick={() => setExam(true)}>Start</Button>
        </div>
      </main>
    )
  }

  return (
    <main>
      <NavBar/>
      <Candidate/>
      <ExamBoard examname={params.examname}/>
      <div>

      </div>
    </main>
  )
}
