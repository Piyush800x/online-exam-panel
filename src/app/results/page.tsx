import React from 'react';
import NavBar from '../components/NavBar';
import Candidate from '../components/Exam/Candidate';

const MockTestResult = () => {
  const questions = Array.from({ length: 100 }, (_, i) => ({
    number: i + 1,
    selectedOption: "---",
    status: 'N/A',
    correctOption: "---",
  }));

  return (
    <div>
      <NavBar />
      <Candidate />
      <div className="p-4 border-black border-2">
        <div className="font-bold text-center text-5xl">
          SCORE CARD
        </div>
        <div className="text-start mb-4 text-red-500">
          Please provide your valuable feedback about Mock Test:
        </div>
        <div className="mb-4">
          <div className="flex justify-between">
            <div>Total Questions: <span className="font-bold">100</span></div>
            <div>Total Attempted: <span className="font-bold">0</span></div>
            <div>Correct Answers: <span className="font-bold">0</span></div>
            <div>Incorrect Answers: <span className="font-bold">0</span></div>
            <div>Score: <span className="font-bold">0</span></div>
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded">STUDENT FEEDBACK</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">BACK</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Question No.</th>
                <th className="py-2">Selected Option</th>
                <th className="py-2">Status</th>
                <th className="py-2">Correct Option</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((q) => (
                <tr key={q.number}>
                  <td className="border px-4 py-2">{`Question ${q.number}`}</td>
                  <td className="border px-4 py-2">{q.selectedOption}</td>
                  <td className="border px-4 py-2">{q.status}</td>
                  <td className="border px-4 py-2">{q.correctOption}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <div className="flex justify-between">
            <button className="transition ease-in-out delay-75 bg-white hover:-translate-x-2 hover:scale-80 hover:bg-gray-300 duration-300  backdrop-blur-50 backdrop-brightness-200 text-black font-bold py-2 px-4 rounded">{"<<"}Previous</button>
            <span>Showing 1 out of 100 entries</span>
            <button className="transition ease-in-out delay-75 bg-white hover:translate-x-2 hover:scale-80 hover:bg-gray-300 duration-300  backdrop-blur-50 backdrop-brightness-200 text-black font-bold py-2 px-4 rounded">Next{">>"}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockTestResult;