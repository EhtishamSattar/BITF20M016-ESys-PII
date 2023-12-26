// Middleware for logging activities
const ActivityLog=require('../models/ActivityLog')
const logActivity = (req, res, next) => {
    const { method, url } = req;
    const timestamp = new Date();
    console.log(`${timestamp} - ${method} ${url}`);

    const log = new ActivityLog({ method: method, url: url });
log.save();
    
    // Save the log to a persistent storage (MongoDB, file, etc.)
    // You can create a dedicated collection for activity logs in MongoDB
    // Example:
    // const log = new ActivityLog({ user, method, url, timestamp });
    // log.save();
    next();
  };
  
module.exports=logActivity
  // Apply the middleware to relevant routes
  
  