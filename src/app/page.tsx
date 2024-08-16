"use client";
import ExamBoard from "@/components/ExamBoard";
import Candidate from "@/components/Candidate";
import NavBar from "@/components/NavBar";
import Link from "next/link";
import QuestionUpload from "@/components/ui/QuestionUpload";
import { useKindeBrowserClient, useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import AddInstitue from "@/components/AddInstitute";

export default function Home() {
  const { isAuthenticated, user, permissions } = useKindeBrowserClient();
  // const { user } = useKindeAuth();
  console.log(user)
  console.log(permissions)

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

  // const returnUser = () => {
  //   if (user?.["role"] === "student") {
  //     return <h1 className="items-center text-center text-4xl mb-4">
  //     Welcome, Master {<span className="font-semibold">{user?.given_name}</span>}!
  //   </h1>
  //   }
  // }

  return (
    <>
      <NavBar />
      <AddInstitue/>
      <main className="flex flex-col p-4 justify-items-center items-center">
        {/* <h1 className="items-center text-center text-4xl mb-4">
          Welcome, {<span className="font-semibold">{user?.given_name}</span>}!
        </h1> */}
        {/* {returnUser()} */}
        <h3>To start exam, click on "Continue"</h3>
        <Link href={"/instructions"}>
          <button className="py-2 px-4 bg-blue-600 rounded-md text-white mt-2">Continue</button>
        </Link>
      </main>
    </>
  );
}
