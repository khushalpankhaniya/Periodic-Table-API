import mongoose from 'mongoose';

// Element schema for Periodic-Table collection
const elementSchema = new mongoose.Schema({
  atomicNumber: { type: Number, required: true, unique: true },
  symbol: { type: String, required: true },
  name: { type: String, required: true },
  atomicWeight: { type: Number, required: true },
  period: { type: Number, required: true },
  group: { type: Number, required: true },
  category: { type: String, required: true },
  stateAtRoomTemp: { type: String, required: true },
  color: { type: String, required: true },
  density: { type: Number },
  meltingPoint: { type: Number },
  boilingPoint: { type: Number },
  discoveryYear: { type: String },
  discoveredBy: { type: String },
  uses: { type: [String] },
});

const Table = mongoose.model('Table', elementSchema, 'Periodic-Table');

export { Table };
