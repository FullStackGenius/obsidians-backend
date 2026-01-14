import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      trim: true
    },
     description: {
      type: String,
      trim: true
    },
     desination: {
      type: String,
      trim: true
    },
    placeHolderImage: {
      type: String,
      trim: true
    },
    videourl: {
      type: String,
      trim: true
    },
    /**
     * Status of the company logo
     * - true  = Active / Visible / Currently used logo
     * - false = Inactive / Hidden / Archived / Not in use
     */
    status: {
      type: Boolean,
      default:true,
    }
  },
  {
    timestamps: true,
    toJSON: {
    transform: (doc, ret) => {
      if (ret.placeHolderImage) {
        ret.placeHolderImage = `${process.env.BASE_URL}/uploads/testimonial/${ret.placeHolderImage}`;
      }
      if (ret.videourl) {
        ret.videourl = `${process.env.BASE_URL}/uploads/testimonial/${ret.videourl}`;
      }
      return ret;
    }
  }
  }
);

export default mongoose.model('Testimonial', TestimonialSchema);
