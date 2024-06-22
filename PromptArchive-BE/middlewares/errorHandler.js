const errorHandler = async (error, req, res, next) => {
  res
    .status(error.status || 5000)
    .json(error.message || "Internal server error");
};

module.exports = errorHandler;
