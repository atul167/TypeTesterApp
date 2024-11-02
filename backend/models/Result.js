import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  wpm: Number,
  accuracy: Number,
  date: { type: Date, default: Date.now },
});

const Result = mongoose.model('Result', ResultSchema);
export default Result