const catchAll = (req,res,next) => {
    const error = new Error(`Route ${req.originalUrl} not defined`);
    error.status = 404;
    next(error);
}

export default catchAll;