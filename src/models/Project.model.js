import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    // ───── BASIC INFO ─────
    projectName: {
      type: String,
      default: "",
      trim: true,
    },

    projectSlug: {
      type: String,
      default: "",
      trim: true,
      index: true,
    },

    shortDescription: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    // ───── IMAGES ─────
    featuredImage: {
      type: String, // filename / url
      default: "",
    },

    projectInfoImage: {
      type: String,
      default: "",
    },

    projectSolutionImage: {
      type: String,
      default: "",
    },

    clientImage: {
      type: String,
      default: "",
    },

    // ───── PROJECT INFO ─────
    projectInfoTitle: {
      type: String,
      default: "",
    },

    projectInfoSubtitle: {
      type: String,
      default: "",
    },

    // ───── ARRAYS (from FormData) ─────
    projectSize: {
      type: [String],
      default: [],
    },

    timeLine: {
      type: [String],
      default: [],
    },

    timeResource: {
      type: [String],
      default: [],
    },

    kpis: {
      type: [String],
      default: [],
    },

    // ───── PROJECT SOLUTION ─────
    projectSolutionContent: {
      type: String,
      default: "",
    },

    // ───── CLIENT INFO ─────
    clientName: {
      type: String,
      default: "",
    },

    clientDesignation: {
      type: String,
      default: "",
    },

    clientReview: {
      type: String,
      default: "",
    },

    // ───── RELATIONS ─────
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProjectService",
      },
    ],

    // future ready
    technologies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProjectTechnology",
      },
    ],

    // ───── STATUS ─────
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Project", ProjectSchema);
