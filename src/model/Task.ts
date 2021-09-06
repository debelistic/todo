import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const { Schema } = mongoose;

export interface TaskType extends mongoose.Document  {
  id: string;
  status: 'pending'|'done'|'archived';
  name: string;
}
export const TaskSchema = new Schema({
  id: {
    type: String,
    default: () => nanoid(6),
  },
  name: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: ['pending', 'done', 'archived'],
    default: 'pending',
  },
}, { timestamps: true });

export const Task = mongoose.model<TaskType>('Task', TaskSchema);


