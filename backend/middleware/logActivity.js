// Middleware for logging activities
const ActivityLog=require('../models/ActivityLog')
const logActivity = (req, res, next) => {
    const { method, url } = req;
    const timestamp = new Date();
    console.log(`${timestamp} - ${method} ${url}`);

    const log = new ActivityLog({ method: method, url: url });
log.save();
    

    next();
  };
  
module.exports=logActivity
  // Apply the middleware to relevant routes
  
  