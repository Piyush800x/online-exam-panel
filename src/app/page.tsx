import Candidate from "./components/Exam/Candidate";
import ExamBoard from "./components/Exam/ExamBoard";
import NavBar from "./components/NavBar";
import QuestionUpload from "@/components/ui/QuestionUpload";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="flex flex-col">
        {/* <h1>Welcome to the Home Page</h1> */}
        <Candidate />
        <QuestionUpload />
        <ExamBoard />
      </main>
    </>
  );
}
