'use client';
import { TailSpin } from 'react-loader-spinner';
import NavBar from '@/components/NavBar';
import React, { useEffect, useState } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

interface ExamSummaryProps {
  numberOfQuestions: number;
  answered: number;
  notAnswered: number;
  markedForReview: number;
  answeredAndMarkedForReview: number;
  notVisited: number;
}

export default function ExamSummary() {
  const [markedForReview, setMarkedForReview] = useState<string | null>('');
  const [notVisited, setNotVisited] = useState<string | null>('');
  const [notAnswered, setNotAnswered] = useState<string | null>('');
  const [answered, setAnswered] = useState<string | null>('');
  const [answeredAndMarkedForReview, setAnsweredAndMarkedForReview] = useState<string | null>('');
  const {user, isAuthenticated} = useKindeBrowserClient();
  const [examName, setExamName] = useState<string | null>('');
  const [institueCode, setInitCode] = useState<string | null>('');
  const [loading, setLoading] = useState<Boolean>(true);

  const [isMobile, setIsMobile] = useState(false);

  const fetchData = async () => {
    const v1 = localStorage.getItem('markedForReview');
    const v2 = localStorage.getItem('notVisited');
    const v3 = localStorage.getItem('notAnswered');
    const v4 = localStorage.getItem('answered');
    const v5 = localStorage.getItem('answeredAndMarkedForReview');
    const examName = localStorage.getItem('examName');
    const initCode = localStorage.getItem('initCode');

    if (v1 === null) {
      setMarkedForReview(null);
    }
    else {
      setMarkedForReview(v1);
    }
    if (v2 === null) {
      setNotVisited(null)
    }
    else {
      setNotVisited(v2);
    }
    if (v3 === null) {
      setNotAnswered(null);
    }
    else {
      setNotAnswered(v3);
    }
    if (v4 === null) {
      setAnswered(null);
    }
    else {
      setAnswered(v4);
    }
    if (v5 === null) {
      setAnsweredAndMarkedForReview(null);
    }
    else {
      setAnsweredAndMarkedForReview(v5);
    }
    if (examName === null) {
      setExamName(null);
    }
    else {
      setExamName(examName);
    }
    if (initCode === null) {
      setInitCode(null);
    }
    else {
      setInitCode(initCode);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated])

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
          <p className="mt-2">This site is developed for desktop systems.</p>
        </div>
      </div>
    );
  }

  return (
    
    <div className="text-center justify-center font-sans">
      <NavBar />
      {loading ? (
        <div className='h-dvh flex items-center justify-center'>
        <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#2A91EB"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
        />
      </div>
      ) : (
        <div className="flex flex-col my-5 items-center">
          <div className="w-max p-4 mb-2 border rounded-md">
            <h1 className="text-xl font-semibold">Candidate Information</h1>
            <p>Candidate name: <span className="font-bold">{user?.given_name} {user?.family_name}</span></p>
            <p>Exam name: <span className="font-bold">{examName}</span></p>
            <p>{institueCode}</p>
          </div>
          <h2 className="text-xl font-semibold mb-3">Exam Summary</h2>
          <table className="mx-auto border-collapse w-4/5 border border-black">
            <thead>
              <tr>
                <th className="border border-black px-4 py-2">Answered</th>
                <th className="border border-black px-4 py-2">Not Answered</th>
                <th className="border border-black px-4 py-2">Marked for Review</th>
                <th className="border border-black px-4 py-2">Answered & Marked for Review</th>
                <th className="border border-black px-4 py-2">Not Visited</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* <td className="border border-black px-4 py-2">{numberOfQuestions}</td> */}
                <td className="border border-black px-4 py-2">{answered}</td>
                <td className="border border-black px-4 py-2">{notAnswered}</td>
                <td className="border border-black px-4 py-2">{markedForReview}</td>
                <td className="border border-black px-4 py-2">{answeredAndMarkedForReview}</td>
                <td className="border border-black px-4 py-2">{notVisited}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

