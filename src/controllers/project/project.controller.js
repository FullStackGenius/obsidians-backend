import Project from "../../models/Project.model.js";
import ProjectService from "../../models/ProjectService.model.js";
import ProjectTechnology from "../../models/ProjectTechnology.model.js";
import { successResponse, errorResponse } from "../../utils/response.js";

// export const createProject = async (req, res) => {
//   try {
//     console.log(req.body, "req.body", req.files, "req.files");
//     /* ───── CREATE PROJECT ───── */
//     const project = await Project.create({
//       projectName: req.body.projectName || "",
//       projectSlug: req.body.projectSlug || "",
//       shortDescription: req.body.shortDescription || "",
//       description: req.body.description || "",

//       // featuredImage: req.files?.find(f => f.fieldname === "featuredImage")?.filename || "",
//       // projectInfoImage: req.files?.find(f => f.fieldname === "projectInfoImage")?.filename || "",
//       // projectSolutionImage: req.files?.find(f => f.fieldname === "projectSolutionImage")?.filename || "",
//       featuredImage: req.files?.featuredImage?.[0]?.filename || "",
//       projectInfoImage: req.files?.projectInfoImage?.[0]?.filename || "",
//       projectSolutionImage:
//         req.files?.projectSolutionImage?.[0]?.filename || "",

//       projectSize: req.body.projectSize || [],
//       timeLine: req.body.timeLine || [],
//       timeResource: req.body.timeResource || [] ,
//       kpis: req.body.kpis || [],

//       projectInfoTitle: req.body.projectInfoTitle || "",
//       projectInfoSubtitle: req.body.projectInfoSubtitle || "",
//       projectSolutionContent: req.body.projectSolutionContent || "",

//       clientName: req.body.clinetName || "",
//       clientDesignation: req.body.clinetDesination || "",
//       clientReview: req.body.clinetReview || "",
//       //clientImage: req.files?.find(f => f.fieldname === "clientImage")?.filename || "",
//       clientImage: req.files?.clientImage?.[0]?.filename || "",
//     });

//     /* ───── SERVICES ───── */
//     const serviceIds = [];
//     let i = 0;

//     while (req.body[`services[${i}][name]`]) {
//       const img = req.files.find(
//         f => f.fieldname === `services[${i}][image]`
//       );

//       const service = await ProjectService.create({
//         project: project._id,
//         name: req.body[`services[${i}][name]`],
//         image: img?.filename || "",
//         oldServiceImage: req.body[`services[${i}][oldServiceImage]`] || "",
//         order: i,
//       });

//       serviceIds.push(service._id);
//       i++;
//     }

//     /* ───── TECHNOLOGIES ───── */
//     const techIds = [];
//     let j = 0;

//     while (req.body[`technologies[${j}][name]`]) {
//       const img = req.files.find(
//         f => f.fieldname === `technologies[${j}][image]`
//       );

//       const tech = await ProjectTechnology.create({
//         project: project._id,
//         name: req.body[`technologies[${j}][name]`],
//         image: img?.filename || "",
//         order: j,
//       });

//       techIds.push(tech._id);
//       j++;
//     }

//     /* ───── LINK BACK ───── */
//     project.services = serviceIds;
//     project.technologies = techIds;
//     await project.save();

//     return successResponse(res, {
//       statusCode: 201,
//       message: "Project created successfully",
//       data: { "req.body": "Today’s Work Update", data: "req.body" },
//     });
//   } catch (error) {
//     return errorResponse(res, {
//       statusCode: 500,
//       message: error.message,
//     });
//   }
// };


export const createProject = async (req, res) => {
  try {
    console.log("Body keys:", Object.keys(req.body));
    console.log("Files:", req.files?.map(f => ({
      field: f.fieldname,
      orig: f.originalname,
      saved: f.filename || "—"
    })) || "No files received");

    // Helper: find single file by exact fieldname
    const getSingleFile = (fieldname) => {
      const file = req.files?.find(f => f.fieldname === fieldname);
      return file ? `/uploads/project/${file.filename}` : ""; // ← adjust prefix if needed
    };

    // ──── Create main Project document ───────────────────────────────
    const project = await Project.create({
      projectName: req.body.projectName?.trim() || "",
      projectSlug: req.body.projectSlug?.trim() || "",
      shortDescription: req.body.shortDescription?.trim() || "",
      description: req.body.description?.trim() || "",

      featuredImage:     getSingleFile("featuredImage"),
      projectInfoImage:  getSingleFile("projectInfoImage"),
      projectSolutionImage: getSingleFile("projectSolutionImage"),
      clientImage:       getSingleFile("clientImage"),

      // Handle possible array or single value (common when multiple inputs same name)
      projectSize:   Array.isArray(req.body.projectSize)   ? req.body.projectSize.filter(Boolean).map(s => s.trim())   : req.body.projectSize ? [req.body.projectSize.trim()] : [],
      timeLine:      Array.isArray(req.body.timeLine)      ? req.body.timeLine.filter(Boolean).map(t => t.trim())      : req.body.timeLine ? [req.body.timeLine.trim()] : [],
      timeResource:  Array.isArray(req.body.timeResource)  ? req.body.timeResource.filter(Boolean).map(t => t.trim())  : req.body.timeResource ? [req.body.timeResource.trim()] : [],
      kpis:          Array.isArray(req.body.kpis)          ? req.body.kpis.filter(Boolean).map(k => k.trim())          : req.body.kpis ? [req.body.kpis.trim()] : [],

      projectInfoTitle:       req.body.projectInfoTitle?.trim() || "",
      projectInfoSubtitle:    req.body.projectInfoSubtitle?.trim() || "",
      projectSolutionContent: req.body.projectSolutionContent?.trim() || "",

      clientName:        req.body.clientName?.trim() || "",          // ← fixed typo if you renamed in form
      clientDesignation: req.body.clientDesignation?.trim() || "",
      clientReview:      req.body.clientReview?.trim() || "",
    });

    // ──── Services (flat naming: services_name_0, services_image_0, …) ────────
    const serviceIds = [];
    let i = 0;

    while (true) {
      const nameKey = `services_name_${i}`;
      const imageKey = `services_image_${i}`;

      const name = req.body[nameKey]?.trim();
      if (!name) break; // no more services

      const imgFile = req.files?.find(f => f.fieldname === imageKey);

      const service = await ProjectService.create({
        project: project._id,
        name,
        image: imgFile ? `/uploads/project/services/${imgFile.filename}` : "",
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

      const imgFile = req.files?.find(f => f.fieldname === imageKey);

      const tech = await ProjectTechnology.create({
        project: project._id,
        name,
        image: imgFile ? `/uploads/project/technologies/${imgFile.filename}` : "",
        order: j,
      });

      techIds.push(tech._id);
      j++;
    }

    // ──── Link arrays back to project ────────────────────────────────────────
    project.services      = serviceIds;
    project.technologies  = techIds;
    await project.save();

    // ──── Response ───────────────────────────────────────────────────────────
    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: {
        projectId: project._id,
        slug: project.projectSlug,
        servicesAdded: serviceIds.length,
        technologiesAdded: techIds.length,
      }
    });

  } catch (error) {
    console.error("Project creation failed:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating project",
      error: error.message,
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
      });

    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
      error: error.message,
    });
  }
};
