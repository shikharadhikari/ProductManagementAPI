const notFound = (req, res, next) => {
   const error = new Error("Page/Resource not found!");
   error.status = 404;
   next(error);
};

export default notFound;
