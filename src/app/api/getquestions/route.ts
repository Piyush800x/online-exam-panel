import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';
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

export async function POST(req: NextRequest, res: NextApiResponse) {
  const examname = (req.headers.get("Metadata") || "jee");

  const response = await GetQuestions(examname);

  return NextResponse.json({questions: response}, {status: 200});
  // return res.status(200).json({ questions: response })
}

async function GetQuestions(exam: string) {
  const client = await mongoClientPromise;
  const db = client.db("ExamQuestions")
  const questionCollection = db.collection('questions');

  const query = {examName: exam.toUpperCase}
  const results = await questionCollection.find(query).toArray();
  console.log(`Result ${results}`);
  return results;
}