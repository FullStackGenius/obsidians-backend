import Project from "../../models/Project.model.js";
import ProjectService from "../../models/ProjectService.model.js";
import ProjectTechnology from "../../models/ProjectTechnology.model.js";
import { successResponse, errorResponse } from "../../utils/response.js";

export const createProject = async (req, res) => {
  try {
    console.log("Body keys:", Object.keys(req.body));
    console.log(
      "Files:",
      req.files?.map((f) => ({
        field: f.fieldname,
        orig: f.originalname,
        saved: f.filename || "—",
      })) || "No files received",
    );

    // Helper: find single file by exact fieldname
    const getSingleFile = (fieldname) => {
      const file = req.files?.find((f) => f.fieldname === fieldname);
      return file ? `${file.filename}` : ""; // ← adjust prefix if needed
    };

    // ──── Create main Project document ───────────────────────────────
    const project = await Project.create({
      projectName: req.body.projectName?.trim() || "",
      projectSlug: req.body.projectSlug?.trim() || "",
      shortDescription: req.body.shortDescription?.trim() || "",
      description: req.body.description?.trim() || "",

      featuredImage: getSingleFile("featuredImage"),
      projectInfoImage: getSingleFile("projectInfoImage"),
      projectSolutionImage: getSingleFile("projectSolutionImage"),
      clientImage: getSingleFile("clientImage"),

      // Handle possible array or single value (common when multiple inputs same name)
      projectSize: Array.isArray(req.body.projectSize)
        ? req.body.projectSize.filter(Boolean).map((s) => s.trim())
        : req.body.projectSize
          ? [req.body.projectSize.trim()]
          : [],
      timeLine: Array.isArray(req.body.timeLine)
        ? req.body.timeLine.filter(Boolean).map((t) => t.trim())
        : req.body.timeLine
          ? [req.body.timeLine.trim()]
          : [],
      timeResource: Array.isArray(req.body.timeResource)
        ? req.body.timeResource.filter(Boolean).map((t) => t.trim())
        : req.body.timeResource
          ? [req.body.timeResource.trim()]
          : [],
      kpis: Array.isArray(req.body.kpis)
        ? req.body.kpis.filter(Boolean).map((k) => k.trim())
        : req.body.kpis
          ? [req.body.kpis.trim()]
          : [],

      projectInfoTitle: req.body.projectInfoTitle?.trim() || "",
      projectInfoSubtitle: req.body.projectInfoSubtitle?.trim() || "",
      projectSolutionContent: req.body.projectSolutionContent?.trim() || "",

      clientName: req.body.clientName?.trim() || "", // ← fixed typo if you renamed in form
      clientDesignation: req.body.clientDesignation?.trim() || "",
      clientReview: req.body.clientReview?.trim() || "",
    });

    // ──── Services (flat naming: services_name_0, services_image_0, …) ────────
    const serviceIds = [];
    let i = 0;

    while (true) {
      const nameKey = `services_name_${i}`;
      const imageKey = `services_image_${i}`;

      const name = req.body[nameKey]?.trim();
      if (!name) break; // no more services

      const imgFile = req.files?.find((f) => f.fieldname === imageKey);

      const service = await ProjectService.create({
        project: project._id,
        name,
        image: imgFile ? `${imgFile.filename}` : "",
        // oldServiceImage: req.body[`services_old_image_${i}`] || "",   // if you have this field
        order: i,
      });

      serviceIds.push(service._id);
      i++;
    }

    // ──── Technologies (same flat pattern) ───────────────────────────────────
    const techIds = [];
    let j = 0;

    while (true) {
      const nameKey = `technologies_name_${j}`;
      const imageKey = `technologies_image_${j}`;

      const name = req.body[nameKey]?.trim();
      if (!name) break;

      const imgFile = req.files?.find((f) => f.fieldname === imageKey);

      const tech = await ProjectTechnology.create({
        project: project._id,
        name,
        image: imgFile ? `${imgFile.filename}` : "",
        order: j,
      });

      techIds.push(tech._id);
      j++;
    }

    // ──── Link arrays back to project ────────────────────────────────────────
    project.services = serviceIds;
    project.technologies = techIds;
    await project.save();

    // ──── Response ───────────────────────────────────────────────────────────
    return successResponse(res, {
      statusCode: 201,
      message: "Home banner Content fetch successfully",
      data: {
        projectId: project._id,
        slug: project.projectSlug,
        servicesAdded: serviceIds.length,
        technologiesAdded: techIds.length,
      },
    });
  } catch (error) {
    console.error("Project creation failed:", error);
    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "services",
        options: { sort: { order: 1 } },
      })
      .populate({
        path: "technologies",
        options: { sort: { order: 1 } },
      })
      .lean();
    const serviceBasePath = `${process.env.BASE_URL}/uploads/project/services/`;
    const techBasePath = `${process.env.BASE_URL}/uploads/project/technologies/`;
    const projectBasePath = `${process.env.BASE_URL}/uploads/project/`;

    const updatedProjects = projects.map((project) => ({
      ...project,
      serviceImageBasePath: serviceBasePath,
      technologyImageBasePath: techBasePath,
      projectImageBasePath: projectBasePath,
    }));
    return successResponse(res, {
      statusCode: 200,
      message: "Home banner Content fetch successfully",
      data: updatedProjects,
    });
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};
