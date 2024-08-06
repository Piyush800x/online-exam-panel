// models/Institute.ts
import mongoose from 'mongoose';

const InstituteSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Institute = mongoose.models.Institute || mongoose.model('Institute', InstituteSchema);

export default Institute;
