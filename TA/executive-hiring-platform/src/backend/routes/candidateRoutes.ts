import { Router } from 'express';
import CandidateController from '../controllers/candidateController';

const router = Router();
const candidateController = new CandidateController();

// Route to create a new candidate profile
router.post('/', candidateController.createCandidate);

// Route to get all candidates
router.get('/', candidateController.getAllCandidates);

// Route to get a candidate by ID
router.get('/:id', candidateController.getCandidateById);

// Route to update a candidate profile
router.put('/:id', candidateController.updateCandidate);

// Route to delete a candidate profile
router.delete('/:id', candidateController.deleteCandidate);

export default router;