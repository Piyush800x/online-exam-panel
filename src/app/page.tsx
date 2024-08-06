"use client";
import Candidate from "./components/Exam/Candidate";
import ExamBoard from "./components/Exam/ExamBoard";
import NavBar from "./components/NavBar";
import Link from "next/link";
import QuestionUpload from "@/components/ui/QuestionUpload";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function Home() {
  const { isAuthenticated, user } = useKindeBrowserClient();

  if (!isAuthenticated) {
    return (
      <>
        <NavBar />
        <main className="flex flex-col p-4">
          <h1 className="items-center text-center text-4xl font-semibold">
            Please Login or Register to continue.
          </h1>
        </main>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <main className="flex flex-col p-4 justify-items-center items-center">
        <h1 className="items-center text-center text-4xl mb-4">
          Welcome, {<span className="font-semibold">{user?.given_name}</span>}!
        </h1>
        <h3>To start exam, click on &quot;Continue&quot;</h3>
        <Link href={"/instructions"}>
          <button className="py-2 px-4 bg-blue-600 rounded-md text-white mt-2">Continue</button>
        </Link>
      </main>
    </>
  );
}
