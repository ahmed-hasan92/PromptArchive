const notFound = async (req, res, next) => {
  res.status(404).json("Route Not Found");
};

module.exports = notFound;
