"use client";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Toaster, toast } from 'sonner'
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

interface Questions {
  questionTitle: string;
  optionOne: string;
  optionTwo: string;
  optionThree: string;
  optionFour: string;
  answer: string;
}

interface Data {
  id: number;
  instituteCode: string;
  examName: string;
  questions: Questions[];
};

export default function ExamBoard({ questionsFull, examName, instituteCode }: { questionsFull: Questions[], examName: string, instituteCode: string }) {
  // const [questions, setQuestions] = useState<Questions[]>([]);
  const questions: Questions[] = questionsFull;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const questionsMarked = Array.from({ length: questions.length }, (_, i) => i + 1);
  const [answeredQuestions, setAnsweredQuestions] = useState<any[]>([]);
  const {user} = useKindeBrowserClient();
  const [btnState, setBtnState] = useState(false);

  console.log(JSON.stringify(`OBJ : ${questions}`));
  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleClear = () => {
    // Retrieve the current exam data from localStorage
    const examData = JSON.parse(localStorage.getItem(examName) || '{}');

    if (examData.answers) {
      // Find the index of the current question in the answers array
      const existingAnswerIndex = examData.answers.findIndex(
        (answer: any, index: number) => index === currentQuestionIndex
      );

      if (existingAnswerIndex !== -1) {
        // Remove the answer for the current question
        examData.answers.splice(existingAnswerIndex, 1);

        // Update localStorage with the modified data
        localStorage.setItem(examName, JSON.stringify(examData));
      }
    }
    toast.success("Answer cleared successfully!")
    // setSelectedOption(null); // Clear selected option
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      loadSavedAnswer(currentQuestionIndex + 1); // Clear selected option when changing question
    }
  };

  const handleJumpQuestion = (number: any) => {
    setCurrentQuestionIndex(number - 1);
    loadSavedAnswer(number - 1); // Clear selected option when changing question
  }

  const handleSaveNext = () => {
    if (selectedOption !== null) {
      const examData = JSON.parse(localStorage.getItem(examName) || '{}');
      
      if (!examData.answers) {
        examData.answers = [];
      }

      if (!examData.examName) {
        examData.examname = examName;
      }

      if (!examData.instituteCode) {
        examData.instituteCode = instituteCode;
      }

      const existingAnswerIndex = examData.answers.findIndex(
        (answer: any, index: number) => index === currentQuestionIndex
      );

      const questionData = {
        questionTitle: questions[currentQuestionIndex].questionTitle,
        answer: selectedOption,
      };

      if (existingAnswerIndex !== -1) {
        examData.answers[existingAnswerIndex] = questionData;
      } else {
        examData.answers.push(questionData);
      }

      localStorage.setItem(examName, JSON.stringify(examData)); // Save the entire exam data to localStorage
      setAnsweredQuestions((prev) => Array.from(new Set([...prev, currentQuestionIndex + 1])));
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      loadSavedAnswer(currentQuestionIndex + 1); // Clear selected option when changing question
    }
    toast.success("Answer saved successfully!")
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      loadSavedAnswer(currentQuestionIndex - 1);
    }
  };

  const loadSavedAnswer = (questionIndex: number) => {
    const savedExamData = JSON.parse(localStorage.getItem(examName) || '{}');
    if (savedExamData.answers) {
      const savedAnswer = savedExamData.answers.find(
        (answer: any, index: number) => index === questionIndex
      );
      if (savedAnswer) {
        setSelectedOption(savedAnswer.answer);
      } else {
        setSelectedOption(null); // Clear the selected option if there's no saved answer
      }
    } else {
      setSelectedOption(null); // Clear the selected option if there's no saved answer
    }
  };

  const handleSubmit = async () => {
    setBtnState(true);
    const savedExamData = JSON.parse(localStorage.getItem(examName) || '{}');
    const sendData = {
      answers: savedExamData, 
      candidateFirstName: user?.given_name,
      candidateLastName: user?.family_name,
      candidateEmail: user?.email,
      candidateAuthId: user?.id,
      examName: examName,
      instituteCode: instituteCode
    };
    try {
      const res = await fetch('/api/answers', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData)
      });
      const data = await res.json();
      if (data.success) {
          toast.success(`Answers Successfully Submitted!`);
      }
      else {
          toast.error("Can't Save!");
      }
    }
    catch (error) {
        console.error("Can't make API Call");
    }
    finally {
      setBtnState(false);
    }
  }

  if (questions.length === 0) {
    return <div className="flex flex-col items-center justify-center">
      <Image src={`/image/Exam/Duck.gif`} unoptimized={true} alt="Loading" width={300} height={300}/>
      <h1 className="text-2xl">Loading...</h1>
    </div>;
  }

  return (
    <div>
      <Toaster/>
      <div className="px-28 flex flex-row justify-between">
        <div className="">
          {/* EXAM */}
          <div>
            <h1 className="mt-4 font-bold">
              Q{currentQuestionIndex + 1}. {questions[currentQuestionIndex].questionTitle}
            </h1>

            <RadioGroup
              value={selectedOption}
              onValueChange={handleOptionChange}
              className="my-4"
            >
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={questions[currentQuestionIndex].optionOne}
                      id={`optionOne_${currentQuestionIndex}`}
                    />
                    <Label htmlFor={`optionOne_${currentQuestionIndex}`}>
                      {questions[currentQuestionIndex].optionOne}
                    </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={questions[currentQuestionIndex].optionTwo}
                    id={`optionTwo_${currentQuestionIndex}`}
                  />
                  <Label htmlFor={`optionTwo_${currentQuestionIndex}`}>
                    {questions[currentQuestionIndex].optionTwo}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={questions[currentQuestionIndex].optionThree}
                    id={`optionThree_${currentQuestionIndex}`}
                  />
                  <Label htmlFor={`optionThree_${currentQuestionIndex}`}>
                    {questions[currentQuestionIndex].optionThree}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={questions[currentQuestionIndex].optionFour}
                    id={`optionFour_${currentQuestionIndex}`}
                  />
                  <Label htmlFor={`optionFour_${currentQuestionIndex}`}>
                    {questions[currentQuestionIndex].optionFour}
                  </Label>
                </div>
              </div>
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
          <div className="flex justify-center w-full gap-x-3 pb-2 pt-2">
            <Button disabled={btnState} onClick={() => handleSubmit()} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 border">Submit</Button>
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
    </div>
  );
}
