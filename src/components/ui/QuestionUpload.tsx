"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const QuestionUpload: React.FC = () => {
  const [examText, setExamText] = useState('jee');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async () => {
    const submit = {
      question: questionText,
      options: options,
      examName: examText
    }
    try {
      const response = await fetch('/api/setquestion', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Metadata': JSON.stringify(submit),
        }
      });
      alert(`Insert Success! InsertID${response}`);
    }
    catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="bg-slate-100 p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h1 className='text-xl text-center font-bold mb-4'>Upload Question</h1>
      <form>
        <div className="mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button value="outline">Exam Name</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem defaultValue={'JEE'}>JEE</DropdownMenuItem>
              <DropdownMenuItem defaultValue={'NEET'}>NEET</DropdownMenuItem>
              <DropdownMenuItem defaultValue={'CAT'}>CAT</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mb-4">
          <label className="block  mb-2" htmlFor="questionText">
            Question Text
          </label>
          <input
            type="text"
            id="questionText"
            className="w-full bg-slate-200 p-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </div>
        <div className="space-y-4">
          {options.map((option, index) => (
            <div key={index}>
              <label className="block mb-2" htmlFor={`option${index + 1}`}>
                Option {index + 1}
              </label>
              <input
                type="text"
                id={`option${index + 1}`}
                className="w-full bg-slate-200 p-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 gap-4 font-semibold">
          <Button onClick={handleSubmit} type="submit" className="bg-slate-200 p-4 rounded hover:bg-green-400 text-black">
            SAVE & NEXT
          </Button>
          <Button type="button" className="bg-slate-200 p-4 rounded hover:bg-slate-300 text-black">
            OTHER OPTIONS
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QuestionUpload;
