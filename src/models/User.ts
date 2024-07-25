import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  role: 'student' | 'teacher';
  institute: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  institute: { type: String, required: true },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
