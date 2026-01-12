import mongoose from 'mongoose';

const CompanyLogoSchema = new mongoose.Schema(
  {
    companyLogoImage: {
      type: String,
      required: true,
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
      if (ret.companyLogoImage) {
        ret.companyLogoImage = `${process.env.BASE_URL}/uploads/companylogo/${ret.companyLogoImage}`;

       
      }
      return ret;
    }
  }
  }
);

export default mongoose.model('CompanyLogo', CompanyLogoSchema);
