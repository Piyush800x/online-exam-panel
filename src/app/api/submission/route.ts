import { NextApiRequest, NextApiResponse } from 'next';
import Submission from '@/models/Submission';


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { examId, studentId, answers } = req.body;
    try {
      const submission = new Submission({ examId, studentId, answers });
      await submission.save();
      res.status(201).json({ message: 'Submission saved successfully', submission });
    } catch (error) {
      res.status(400).json({ message: 'Error saving submission', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
