import rateLimit from "express-rate-limit";

const specificLoginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,
  message: "Too many login attempts",
});

export default specificLoginLimiter;
