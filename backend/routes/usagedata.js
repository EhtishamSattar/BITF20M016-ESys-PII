// Fetch activity logs for the last 30 days

const express=require('express');
const mongoose=require('mongoose');
const ActivityLog = require('../models/ActivityLog');
const router=express.Router();

router.get('/30-days', async (req, res) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const logs = await ActivityLog.find({ timestamp: { $gte: thirtyDaysAgo } });
    res.json(logs);
  });
  
  // Fetch activity logs for the last 24 hours
router.get('/24-hours', async (req, res) => {
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
    const logs = await ActivityLog.find({ timestamp: { $gte: twentyFourHoursAgo } });
    res.json(logs);
  });
  

module.exports=router