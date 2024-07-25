// pages/api/exam.ts
import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Exam from '@/models/Exam';


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { institute, examName, questions } = req.body;
    try {
      const exam = new Exam({ institute, examName, questions });
      await exam.save();
      res.status(201).json({ message: 'Exam created successfully', exam });
    } catch (error) {
      res.status(400).json({ message: 'Error creating exam', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
