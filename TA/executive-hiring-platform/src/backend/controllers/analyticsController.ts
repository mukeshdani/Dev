export class AnalyticsController {
    private analyticsService: AnalyticsService;

    constructor(analyticsService: AnalyticsService) {
        this.analyticsService = analyticsService;
    }

    public async getHiringMetrics(req: Request, res: Response): Promise<void> {
        try {
            const metrics = await this.analyticsService.getHiringMetrics();
            res.status(200).json(metrics);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving hiring metrics', error });
        }
    }

    public async getCandidateInsights(req: Request, res: Response): Promise<void> {
        try {
            const insights = await this.analyticsService.getCandidateInsights();
            res.status(200).json(insights);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving candidate insights', error });
        }
    }

    public async getJobPerformance(req: Request, res: Response): Promise<void> {
        try {
            const performance = await this.analyticsService.getJobPerformance();
            res.status(200).json(performance);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving job performance data', error });
        }
    }
}