'use client';
import ExamBoard from "@/app/components/Exam/ExamBoard";
import NavBar from "@/app/components/NavBar";
import Image from "next/image";

export default function ExamUi({params}: {params: {examname: string}}) {
  console.log(`Page: ${params.examname}`)
  return (
    <main>
      <NavBar/>
      <ExamBoard examname={params.examname}/>
    </main>
  )
}
