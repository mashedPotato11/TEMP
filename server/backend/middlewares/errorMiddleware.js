const notFound = (req, res, next) => {
  const error = new Error("Url Not Found");
  res.status(404);
  next();
};

module.exports = { notFound };
