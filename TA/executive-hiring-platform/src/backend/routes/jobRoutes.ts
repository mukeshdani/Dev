import { Router } from 'express';
import JobController from '../controllers/jobController';

const router = Router();
const jobController = new JobController();

// Define routes for job management
router.post('/jobs', jobController.createJob);
router.get('/jobs', jobController.getAllJobs);
router.get('/jobs/:id', jobController.getJobById);
router.put('/jobs/:id', jobController.updateJob);
router.delete('/jobs/:id', jobController.deleteJob);

export default router;