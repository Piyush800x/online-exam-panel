'use client';
import NavBar from "@/components/NavBar";
import Candidate from "@/components/Candidate";
import ExamBoard from "@/components/ExamBoard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import Instructions from "@/components/Instructions";

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
  const [perQuestionMark, setPerQuestionMark] = useState<string>('');
  const [perQuestionNegativeMark, setPerQuestionNegativeMark] = useState<string>('');

  const [isMobile, setIsMobile] = useState(false);

  const fetchQuestions = async () => {
    const sendData = {
      id: params.id
    }
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
        setQuestions(data.data[0].questions)
        setExamName(data.data[0].examName)
        setInstituteCode(data.data[0].instituteCode)
        setExamDuration(data.data[0].questions[0].examDuration)
        setPerQuestionMark(data.data[0].questions[0].questionMark)
        setPerQuestionNegativeMark(data.data[0].questions[0].negativeMark)
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) { // Adjust this value if needed for mobile width
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    // Run the function on initial load
    handleResize();

    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-black text-white text-center p-4">
        <div>
          <h1 className="text-2xl font-bold">Please open in desktop</h1>
          <p className="mt-2">This website is not optimized for mobile devices.</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return (
      <main className="flex flex-col  justify-center">
        <NavBar/>
        <div className='flex flex-col items-center justify-center text-center'>
            <div className=''>
              <Image 
                src={`/gifs/hello.gif`}
                alt='hello.gif'
                width={500}
                height={500}
                unoptimized
              />
            </div>
            <h1 className='font-medium text-3xl'>Please login to start your exam.</h1>
          </div>
      </main>
    )
  }

  if (!exam) {
    return (
      <main className="flex flex-col">
        <NavBar/>
        <Instructions/>
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
      <Candidate time={examDuration} instituteCode={instituteCode} examName={examName} perQuesMark={perQuestionMark} perQuesNegativeMark={perQuestionNegativeMark}/>
      <ExamBoard questionsFull={questions} examName={examName} instituteCode={instituteCode} examDuration={examDuration}/>
      <div>

      </div>
    </main>
  )
}
