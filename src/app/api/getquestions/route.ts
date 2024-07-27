import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

type Question = {
  id: number;
  imageUrl: string;
};

const questions: Question[] = [
  {
    id: 1,
    imageUrl: '/image/Questions/q1.jpg',
  },
  {
    id: 2,
    imageUrl: '/image/Questions/q2.jpg',
  },
  // Add more questions here
];

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  return NextResponse.json(questions);
}
