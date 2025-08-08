const centralErrorHandler = (err,req,res,next) => {
    res.status(err.status).json({error:err.message, status:err.status});
}

export default centralErrorHandler;