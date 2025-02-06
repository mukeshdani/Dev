export class CandidateController {
    constructor(private candidateService: CandidateService) {}

    async createCandidate(req, res) {
        try {
            const candidateData = req.body;
            const newCandidate = await this.candidateService.createCandidate(candidateData);
            res.status(201).json(newCandidate);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getCandidate(req, res) {
        try {
            const candidateId = req.params.id;
            const candidate = await this.candidateService.getCandidateById(candidateId);
            if (!candidate) {
                return res.status(404).json({ message: 'Candidate not found' });
            }
            res.status(200).json(candidate);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateCandidate(req, res) {
        try {
            const candidateId = req.params.id;
            const updatedData = req.body;
            const updatedCandidate = await this.candidateService.updateCandidate(candidateId, updatedData);
            if (!updatedCandidate) {
                return res.status(404).json({ message: 'Candidate not found' });
            }
            res.status(200).json(updatedCandidate);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteCandidate(req, res) {
        try {
            const candidateId = req.params.id;
            const result = await this.candidateService.deleteCandidate(candidateId);
            if (!result) {
                return res.status(404).json({ message: 'Candidate not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllCandidates(req, res) {
        try {
            const candidates = await this.candidateService.getAllCandidates();
            res.status(200).json(candidates);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}