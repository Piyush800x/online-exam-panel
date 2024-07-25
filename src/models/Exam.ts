import mongoose, { Schema, Document } from 'mongoose';

export interface IExam extends Document {
  institute: string;
  examName: string;
  questions: { question: string; answers: string[]; correctAnswer: string }[];
}

const ExamSchema: Schema = new Schema({
  institute: { type: String, required: true },
  examName: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      answers: { type: [String], required: true },
      correctAnswer: { type: String, required: true },
    },
  ],
});

export default mongoose.models.Exam || mongoose.model<IExam>('Exam', ExamSchema);
