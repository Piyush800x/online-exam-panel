import NavBar from '@/components/NavBar';
import Candidate from '@/components/Candidate';

import React from 'react';

interface ExamSummaryProps {
  numberOfQuestions: number;
  answered: number;
  notAnswered: number;
  markedForReview: number;
  answeredAndMarkedForReview: number;
  notVisited: number;
}

const ExamSummary: React.FC<ExamSummaryProps> = ({
  numberOfQuestions,
  answered,
  notAnswered,
  markedForReview,
  answeredAndMarkedForReview,
  notVisited
}) => {
  return (
    
    <div className="text-center font-sans">
        <NavBar />
        <Candidate />
      <div className="my-5">
        <h2 className="text-xl font-semibold mb-3">Exam Summary</h2>
        <table className="mx-auto border-collapse w-4/5 border border-black">
          <thead>
            <tr>
              <th className="border border-black px-4 py-2">No of Questions</th>
              <th className="border border-black px-4 py-2">Answered</th>
              <th className="border border-black px-4 py-2">Not Answered</th>
              <th className="border border-black px-4 py-2">Marked for Review</th>
              <th className="border border-black px-4 py-2">Answered & Marked for Review</th>
              <th className="border border-black px-4 py-2">Not Visited</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black px-4 py-2">{numberOfQuestions}</td>
              <td className="border border-black px-4 py-2">{answered}</td>
              <td className="border border-black px-4 py-2">{notAnswered}</td>
              <td className="border border-black px-4 py-2">{markedForReview}</td>
              <td className="border border-black px-4 py-2">{answeredAndMarkedForReview}</td>
              <td className="border border-black px-4 py-2">{notVisited}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExamSummary;

