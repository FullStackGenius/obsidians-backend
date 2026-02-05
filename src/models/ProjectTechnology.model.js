import mongoose from "mongoose";

const ProjectTechnologySchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    name: { type: String, required: true },

    image: { type: String },

    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model(
  "ProjectTechnology",
  ProjectTechnologySchema,
  "projectTechnologies"
);
