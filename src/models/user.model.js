import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    profileImage: {
      type: String,
      trim: true
    },
    password: {
      type: String,
      required: true,
      select: false // 🔐 security best practice
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('User', userSchema);
