import Candidate from "./components/Exam/Candidate";
import ExamBoard from "./components/Exam/ExamBoard";
import NavBar from "./components/NavBar";
import QuestionUpload from "@/components/ui/QuestionUpload";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="flex flex-col">
        <h1 className="items-center text-center text-4xl">Welcome to the Home Page</h1>
      </main>
    </>
  );
}
