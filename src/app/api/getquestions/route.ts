import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import mongoClientPromise from '@/lib/mongodb';

type Question = {
  id: number;
  question: string;
  answers: string[];
  examName: string;
};

// const questions: Question[] = [
//   {
//     id: 1,
//     imageUrl: '/image/Questions/q1.jpg',
//   },
//   {
//     id: 2,
//     imageUrl: '/image/Questions/q2.jpg',
//   },
//   // Add more questions here
// ];

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const response = await GetQuestions();
  return NextResponse.json({questions: response}, {status: 200});
}

async function GetQuestions() {
  const client = await mongoClientPromise;
  const db = client.db("ExamQuestions")
  const questionCollection = db.collection('questions');

  const query = {examName: "JEE"}
  const results = questionCollection.find({query});
  return results;
}