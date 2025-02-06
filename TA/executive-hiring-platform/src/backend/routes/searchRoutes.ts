import { Router } from 'express';
import { SearchController } from '../controllers/searchController';

const router = Router();
const searchController = new SearchController();

// Route for searching candidates
router.get('/candidates', searchController.searchCandidates.bind(searchController));

// Route for advanced search options
router.post('/candidates/advanced', searchController.advancedSearch.bind(searchController));

export default router;