'use client';
import Candidate from "@/app/components/Exam/Candidate"
import NavBar from "@/app/components/NavBar"
import QuestionUpload from "@/components/ui/QuestionUpload"
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";

export default function Dashboard() {
  const {isAuthenticated} = useKindeBrowserClient();

  if (!isAuthenticated) {
    return (
      <main className="flex flex-col  justify-center">
        <NavBar/>
        <h1 className="items-center text-center text-4xl">Please Register or Login to Upload Question.</h1>
      </main>
    )
  }

  return (
    <main>
      <NavBar/>
      <QuestionUpload/>
    </main>
  )
}