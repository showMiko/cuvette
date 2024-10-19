const Job=require("../models/jobModels")
const transporter=require("../config/nodemailer");

const createJob = async (req, res) => {
  try {
    const { jobTitle, jobDescription, experienceLevel, candidates, endDate,userId } = req.body;
    const job = new Job({
      jobTitle,
      jobDescription,
      experienceLevel,
      candidates,
      endDate,
      userId,
    });


    await job.save();


    for (const candidate of candidates) {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: candidate,
          subject: 'New Job Opportunity',
          html: `
            <div>
              <h1 style="font-size: 2em; font-weight: bold;">Greeting From Cuvette Tech</h1>
              <div style="margin-top: 1em; padding: 1em; border: 1px solid gray; border-radius: 0.5em;">
                <h2 style="font-size: 1.5em; font-weight: bold;">Job Title:</h2>
                <div style="font-size: 1.25em;">${job.jobTitle}</div>
              </div>
              
              <div style="margin-top: 1em; padding: 1em; border: 1px solid gray; border-radius: 0.5em;">
                <h2 style="font-size: 1.5em; font-weight: bold;">Job Description:</h2>
                <div style="font-size: 1.25em;">${job.jobDescription}</div>
              </div>
              
              <div style="margin-top: 1em; padding: 1em; border: 1px solid gray; border-radius: 0.5em;">
                <h2 style="font-size: 1.5em; font-weight: bold;">Experience Level:</h2>
                <div style="font-size: 1.25em;">${job.experienceLevel}</div>
              </div>
              
              <div style="margin-top: 1em; padding: 1em; border: 1px solid gray; border-radius: 0.5em;">
                <h2 style="font-size: 1.5em; font-weight: bold;">Candidates:</h2>
                <div style="font-size: 1.25em;">${job.candidates.join(', ')}</div>
              </div>
              
              <div style="margin-top: 1em; padding: 1em; border: 1px solid gray; border-radius: 0.5em;">
                <h2 style="font-size: 1.5em; font-weight: bold;">Application Deadline:</h2>
                <div style="font-size: 1.25em;">${new Date(job.endDate).toLocaleDateString()}</div>
              </div>
            </div>
          `,
        };
      

        await transporter.sendMail(mailOptions);
      }

    res.status(201).json({ message: 'Job created successfully', job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create job', error });
  }
};




const fetchJobsByUserId = async (req, res) => {
    try {
      const { userId } = req.query; 
      const jobs = await Job.find({ userId }); 
  
      if (!jobs) {
        return res.status(404).json({ message: 'No jobs found for this user' });
      }
  
      res.status(200).json(jobs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch jobs', error });
    }
  };
  
  module.exports = { createJob, fetchJobsByUserId };