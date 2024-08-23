'use client';
import { TailSpin } from 'react-loader-spinner';
import React, { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Button } from "@/components/ui/button"
import Image from 'next/image';
import { ObjectId } from 'mongodb';

interface Results {
  _id: ObjectId,
  instituteCode: string,
  examName: string,
  candidateAuthId:string,
  correct: string,
  wrong: string,
  marks: string,
  candidateFirstName: string,
  candidateLastName: string,
  candidateEmail: string,
  questionLength: number
}

const MockTestResult = () => {
  const {user, isAuthenticated} = useKindeBrowserClient();
  const [results, setResult] = useState<Results[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchResult = async () => {
    if (isAuthenticated) {
      const sendData = {
        candidateAuthId: user?.id
      }
      try {
          const res = await fetch('/api/getresult', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(sendData)
          });
          const data = await res.json();
          if (data.success) {
              setResult(data.data);
              // console.log(JSON.stringify(data.data));
            }
          else {
              // toast.error("Can't fetch!");
          }
      }
      catch (error) {
        console.error("Can't make API Call");
      }
      finally {
        setLoading(false);
      }
    }
    else {
      setLoading(false);
    }
    
  }


  useEffect(() => {
    if (isAuthenticated) {
      fetchResult();
    } 
  }, [isAuthenticated]);

  return (
    <main>
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
        !isAuthenticated ?  (
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
              <h1 className='font-medium text-3xl'>Please login to see your result!</h1>
          </div>
        ) : (
        <div className="flex flex-col items-center w-full gap-3 px-7 py-3">
          <div className="font-bold text-center text-3xl">
            SCORE CARD
          </div>
          <div className="flex flex-col border rounded-md py-2 px-4 w-max">
            <h1 className="text-xl font-semibold">Candidate details:</h1>
            <p>Name: {results[0].candidateFirstName} {results[0].candidateLastName}</p>
            <p>Email: {results[0].candidateEmail}</p>
          </div>
          {results.map((result) => (
            <div className="mb-4 border w-full rounded-md py-4" key={`${result._id}`}>
              <div className="flex flex-row justify-around w-full">
                <p>Exam: {result?.examName}</p>
                <p>Institute code: {result?.instituteCode}</p>
                <div>Total Questions: <span className="font-bold">{result?.questionLength}</span></div>
                <div>Total Attempted: <span className="font-bold">{parseInt(`${result?.correct}`) + parseInt(`${result?.wrong}`)}</span></div>
                <div>Correct Answers: <span className="font-bold">{result?.correct}</span></div>
                <div>Incorrect Answers: <span className="font-bold">{result?.wrong}</span></div>
                <div>Score: <span className="font-bold">{result?.marks}</span></div>
              </div>
            </div>
          ))}
          <p>For future reference, please take a screenshot or print it.</p>
          <Button 
            onClick={window.print}
            >
            Print Page
          </Button>
        </div>
      ))}
    </main>
  );
};

export default MockTestResult;