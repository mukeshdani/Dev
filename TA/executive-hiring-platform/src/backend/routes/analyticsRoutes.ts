import { Router } from 'express';
import AnalyticsController from '../controllers/analyticsController';

const router = Router();
const analyticsController = new AnalyticsController();

// Route to get hiring metrics
router.get('/metrics', analyticsController.getMetrics);

// Route to get performance insights
router.get('/insights', analyticsController.getInsights);

export default router;