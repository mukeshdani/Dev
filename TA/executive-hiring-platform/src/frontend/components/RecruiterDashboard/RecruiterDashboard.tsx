import React, { useState, useEffect } from 'react';
import JobService from '../../../backend/services/job/jobService';
import CandidateService from '../../../backend/services/candidate/candidateService';

const RecruiterDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');

    useEffect(() => {
        fetchJobs();
        fetchCandidates();
    }, []);

    const fetchJobs = async () => {
        const jobService = new JobService();
        const jobList = await jobService.getAllJobs();
        setJobs(jobList);
    };

    const fetchCandidates = async () => {
        const candidateService = new CandidateService();
        const candidateList = await candidateService.getAllCandidates();
        setCandidates(candidateList);
    };

    const handleJobSubmit = async (e) => {
        e.preventDefault();
        const jobService = new JobService();
        await jobService.createJob({ title: jobTitle, description: jobDescription });
        fetchJobs();
        setJobTitle('');
        setJobDescription('');
    };

    return (
        <div>
            <h1>Recruiter Dashboard</h1>
            <form onSubmit={handleJobSubmit}>
                <input
                    type="text"
                    placeholder="Job Title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Job Description"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    required
                />
                <button type="submit">Post Job</button>
            </form>
            <h2>Job Listings</h2>
            <ul>
                {jobs.map((job) => (
                    <li key={job.id}>{job.title}</li>
                ))}
            </ul>
            <h2>Candidates</h2>
            <ul>
                {candidates.map((candidate) => (
                    <li key={candidate.id}>{candidate.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default RecruiterDashboard;