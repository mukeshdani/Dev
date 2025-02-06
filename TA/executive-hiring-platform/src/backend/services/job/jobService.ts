export class JobService {
    constructor(jobModel) {
        this.jobModel = jobModel;
    }

    async createJob(jobData) {
        const newJob = new this.jobModel(jobData);
        return await newJob.save();
    }

    async getJobById(jobId) {
        return await this.jobModel.findById(jobId);
    }

    async updateJob(jobId, jobData) {
        return await this.jobModel.findByIdAndUpdate(jobId, jobData, { new: true });
    }

    async deleteJob(jobId) {
        return await this.jobModel.findByIdAndDelete(jobId);
    }

    async getAllJobs() {
        return await this.jobModel.find();
    }
}