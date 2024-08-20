'use client';
import NavBar from "@/components/NavBar";
import Candidate from "@/components/Candidate";
import ExamBoard from "@/components/ExamBoard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";

interface Questions {
  questionTitle: string;
  optionOne: string;
  optionTwo: string;
  optionThree: string;
  optionFour: string;
  answer: string;
}

export default function ExamUi({params}: {params: {id: string}}) {
  const [exam, setExam] = useState(false);
  const {isAuthenticated} = useKindeBrowserClient();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Questions[]>([])
  const [examName, setExamName] = useState<string>('');
  const [instituteCode, setInstituteCode] = useState<string>('');
  const [examDuration, setExamDuration] = useState<string>('');

  const fetchQuestions = async () => {
    const sendData = {
      id: params.id
    }
    console.log(`sendData: ${JSON.stringify(sendData)}`);
    try {
      const res = await fetch(`/api/getquestions`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData)
      });
      const data = await res.json();
      if (data.success) {
        console.log(JSON.stringify(data.data[0].questions))
        setQuestions(data.data[0].questions)
        setExamName(data.data[0].examName)
        setInstituteCode(data.data[0].instituteCode)
        setExamDuration(data.data[0].questions[0].examDuration)
      }
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchQuestions();
    }
  }, [isAuthenticated]);
  
  if (!isAuthenticated) {
    return (
      <main className="flex flex-col  justify-center">
        <NavBar/>
        <h1 className="items-center text-center text-4xl mt-4 font-semibold">Register or Login to start exam.</h1>
      </main>
    )
  }

  if (!exam) {
    return (
      <main className="flex flex-col">
        <NavBar/>
        <div className="flex flex-col items-center my-10">
          <label htmlFor="exam" className="text-3xl font-semibold mb-2">Click Start to start the exam</label>
          <Button disabled={loading} className="text-xl " onClick={() => setExam(true)}>Start</Button>
        </div>
      </main>
    )
  }

  return (
    <main>
      <NavBar/>
      <Candidate time={examDuration} instituteCode={instituteCode} examName={examName}/>
      <ExamBoard questionsFull={questions} examName={examName} instituteCode={instituteCode} examDuration={examDuration}/>
      <div>

      </div>
    </main>
  )
}
