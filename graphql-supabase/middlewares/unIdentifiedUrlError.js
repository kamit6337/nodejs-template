const unIdentifiedUrlError = (req, res, next) => {
  return next({
    message: `Somethings went wrong. Please check your Url - ${req.originalUrl}`,
    status: "Fail",
    statusCode: 500,
  });
};

export default unIdentifiedUrlError;
