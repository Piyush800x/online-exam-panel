"use client";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type Question = {
  id: number;
  question: string;
  answers: string[];
  examName: string;
};

export default function ExamBoard({ examname }: { examname: string }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const questionsMarked = Array.from({ length: questions.length }, (_, i) => i + 1);
  const [answeredQuestions, setAnsweredQuestions] = useState<any[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      console.log(`Examname: ${examname}`)
      try {
        const response = await fetch("/api/getquestions", { method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Metadata': examname,
        },
        body: examname
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data.questions);
          setQuestions(data.questions);
        }
        else {
          console.error(`Error fetching details`)
        }
        //   setQuestionsMarked(Array.from({length: questions.length}, (_, i) => i + 1))
      }
      catch (error) {
        console.error(error);
      };
      }

    fetchQuestions();
  }, []);

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleClear = () => {
    setSelectedOption(null); // Clear selected option
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null); // Clear selected option when changing question
    }
  };

  const handleJumpQuestion = (number: any) => {
    setCurrentQuestionIndex(number - 1);
    setSelectedOption(null); // Clear selected option when changing question
  }

  const handleSaveNext = () => {
    if (selectedOption !== null) {
      const questionKey = `question_${currentQuestionIndex + 1}`;
      localStorage.setItem(questionKey, selectedOption); // Save selected option to localStorage
      setAnsweredQuestions((prev) => Array.from(new Set([...prev, currentQuestionIndex + 1])));
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null); // Clear selected option when changing question
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null); // Clear selected option when changing question
    }
  };

  if (questions.length === 0) {
    return <div className="flex flex-col items-center justify-center">
      <Image src={`/image/Exam/Duck.gif`} unoptimized={true} alt="Loading" width={300} height={300}/>
      <h1 className="text-2xl">Loading...</h1>
    </div>;
  }

  return (
    <div className="px-28 flex flex-row justify-between">
      <div className="">
        {/* EXAM */}
        <div>
          <h1 className="mt-4 font-bold">
            Q{currentQuestionIndex + 1}. {questions[currentQuestionIndex].question}
          </h1>

          <RadioGroup
            value={selectedOption}
            onValueChange={handleOptionChange}
            className="my-4"
          >
            {
              questions.map((obj, index) => (
                <div className="flex items-center space-x-2" key={index}>
                  <RadioGroupItem value={obj.answers[index]} id={`${index}`} />
                  <Label htmlFor={`r${index}`}>{obj.answers[index]}</Label>
                </div>
              ))
            }
          </RadioGroup>
        </div>
        {/* SUBMIT */}
        <div className="flex flex-col gap-x-3">
          <div className="flex justify-between pb-2">
            <Button
              onClick={handlePrevious}
              className="bg-green-600 hover:bg-green-500"
            >
              PREVIOUS
            </Button>
            <Button
              onClick={handleNext}
              className="bg-green-600 hover:bg-green-500"
            >
              NEXT
            </Button>
          </div>
          <div className="flex flex-row gap-x-3">
            <Button
              onClick={handleSaveNext}
              className="bg-green-600 hover:bg-green-500"
            >
              SAVE & NEXT
            </Button>
            <Button onClick={handleClear} className="bg-red-600 hover:bg-red-500">
              CLEAR
            </Button>
            <Button
              onClick={handleSaveNext}
              disabled={currentQuestionIndex === questions.length - 1}
              className="bg-blue-600 hover:bg-blue-500"
            >
              SAVE & MARK FOR REVIEW
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentQuestionIndex === questions.length - 1}
              className="bg-purple-600 hover:bg-purple-500"
            >
              MARK FOR REVIEW & NEXT
            </Button>
          </div>
        </div>
      </div>
      <div className="ml-24">
        {/* INSTRUCTION TYPE */}
        <div className="border-2 border-black border-dotted px-5 py-5 mt-4 grid grid-cols-2">
          <div className="flex flex-row gap-x-2">
            <div className="font-bold">{questions.length - answeredQuestions.length}</div>
            <div>Not Visited</div>
          </div>

          <div className="flex flex-row gap-x-2">
            <div className="font-bold text-red-600">{questions.length - answeredQuestions.length}</div>
            <div>Not Answered</div>
          </div>

          <div className="flex flex-row gap-x-2">
            <div className="font-bold text-green-600">{answeredQuestions.length}</div>
            <div>Answered</div>
          </div>

          <div className="flex flex-row gap-x-2">
            <div className="font-bold text-purple-700">{0}</div>
            <div>Marked for Review</div>
          </div>

          <div className="flex flex-row gap-x-2">
            <div className="font-bold text-blue-600">{0}</div>
            <div>Answered & Marked for Review</div>
          </div>
        </div>
        {/* ANSWER COUNT */}
        <div>
          <div className="grid grid-cols-10 gap-2 p-4">
            {questionsMarked.map((seat) => (
              <button
                key={seat}
                className={`flex items-center justify-center w-10 h-10 border rounded ${
                  answeredQuestions.includes(seat)
                    ? "bg-green-500 text-white"
                    : seat === currentQuestionIndex + 1
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100"
                }`}
                  onClick={() => {
                    handleJumpQuestion(seat)
                  }}
              >
                {seat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
