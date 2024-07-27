import mongoose, { Schema, Document } from 'mongoose';

export interface ISubmission extends Document {
  examId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  answers: { questionId: mongoose.Types.ObjectId; answer: string }[];
}

const SubmissionSchema: Schema = new Schema({
  examId: { type: mongoose.Types.ObjectId, required: true, ref: 'Exam' },
  studentId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  answers: [
    {
      questionId: { type: mongoose.Types.ObjectId, required: true },
      answer: { type: String, required: true },
    },
  ],
});

export default mongoose.models.Submission || mongoose.model<ISubmission>('Submission', SubmissionSchema);
