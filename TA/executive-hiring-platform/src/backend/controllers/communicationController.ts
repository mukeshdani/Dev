export class CommunicationController {
    private communicationService: CommunicationService;

    constructor(communicationService: CommunicationService) {
        this.communicationService = communicationService;
    }

    public async sendMessage(req: Request, res: Response): Promise<void> {
        try {
            const { recipientId, message } = req.body;
            const result = await this.communicationService.sendMessage(recipientId, message);
            res.status(200).json({ success: true, result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    public async sendNotification(req: Request, res: Response): Promise<void> {
        try {
            const { recipientId, notification } = req.body;
            const result = await this.communicationService.sendNotification(recipientId, notification);
            res.status(200).json({ success: true, result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}