export class SearchController {
    constructor(private searchService: SearchService) {}

    async searchCandidates(req, res) {
        try {
            const { criteria } = req.body;
            const matchedCandidates = await this.searchService.search(criteria);
            res.status(200).json(matchedCandidates);
        } catch (error) {
            res.status(500).json({ message: 'Error searching candidates', error });
        }
    }
}