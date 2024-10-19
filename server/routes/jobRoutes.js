
const express = require('express');
const { createJob,fetchJobsByUserId } = require('../controllers/jobController');
const router = express.Router();

router.post('/create', createJob);
router.get('/fetchJobs',fetchJobsByUserId);

module.exports = router;
