export class JobController {
    constructor(private jobService: JobService) {}

    async createJob(req, res) {
        try {
            const jobData = req.body;
            const newJob = await this.jobService.createJob(jobData);
            res.status(201).json(newJob);
        } catch (error) {
            res.status(500).json({ message: 'Error creating job', error });
        }
    }

    async getAllJobs(req, res) {
        try {
            const jobs = await this.jobService.getAllJobs();
            res.status(200).json(jobs);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching jobs', error });
        }
    }

    async getJobById(req, res) {
        try {
            const jobId = req.params.id;
            const job = await this.jobService.getJobById(jobId);
            if (!job) {
                return res.status(404).json({ message: 'Job not found' });
            }
            res.status(200).json(job);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching job', error });
        }
    }

    async updateJob(req, res) {
        try {
            const jobId = req.params.id;
            const jobData = req.body;
            const updatedJob = await this.jobService.updateJob(jobId, jobData);
            if (!updatedJob) {
                return res.status(404).json({ message: 'Job not found' });
            }
            res.status(200).json(updatedJob);
        } catch (error) {
            res.status(500).json({ message: 'Error updating job', error });
        }
    }

    async deleteJob(req, res) {
        try {
            const jobId = req.params.id;
            const deletedJob = await this.jobService.deleteJob(jobId);
            if (!deletedJob) {
                return res.status(404).json({ message: 'Job not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting job', error });
        }
    }
}