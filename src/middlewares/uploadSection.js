export const setUploadSection = (section) => {
  return (req, res, next) => {
    req.uploadSection = section;
    next();
  };
};
