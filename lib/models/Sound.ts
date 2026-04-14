import mongoose, { Schema, Document } from 'mongoose';

export interface ISound extends Document {
  name: string;
  category: string;
  description: string;
  duration: number;
  downloads: number;
  likes: number;
  fileUrl: string;
  imageUrl?: string;
  featured: boolean;
  trending: boolean;
  isNew: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SoundSchema = new Schema<ISound>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a sound name'],
      unique: true,
      trim: true,
      maxlength: [100, 'Sound name cannot be more than 100 characters'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: ['Funny', 'Transitions', 'Impact', 'Voice Effects', 'Ambient', 'Cinematic', 'Retro', 'Modern'],
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    duration: {
      type: Number,
      required: [true, 'Please provide duration'],
    },
    downloads: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    fileUrl: {
      type: String,
      required: [true, 'Please provide a file URL'],
    },
    imageUrl: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    trending: {
      type: Boolean,
      default: false,
    },
    isNew: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Sound = mongoose.models.Sound || mongoose.model<ISound>('Sound', SoundSchema);
