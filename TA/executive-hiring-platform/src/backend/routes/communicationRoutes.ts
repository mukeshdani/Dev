import { Router } from 'express';
import CommunicationController from '../controllers/communicationController';

const router = Router();
const communicationController = new CommunicationController();

// Route to send a message
router.post('/send', communicationController.sendMessage);

// Route to get messages
router.get('/messages', communicationController.getMessages);

// Route to send notifications
router.post('/notify', communicationController.sendNotification);

export default router;