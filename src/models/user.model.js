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
      trim: true,
      default: null
    },
    password: {
      type: String,
      required: true,
      select: false // 🔐 security best practice
    }
  },
  {
    timestamps: true,
    toJSON: {
    transform: (doc, ret) => {
      if (ret.profileImage) {
        // Option A - most common
        ret.profileImage = `${process.env.BASE_URL}/uploads/profile/${ret.profileImage}`;

        // Option B - more explicit (if profileImage already contains /uploads/)
        // ret.profileImage = `${process.env.BASE_URL}/uploads/profile/${ret.profileImage}`;
      }
      return ret;
    }
  }
  }
);

export default mongoose.model('User', userSchema);
