export class CandidateService {
    private candidates: any[] = [];

    public createCandidate(candidateData: any): any {
        const newCandidate = { id: this.candidates.length + 1, ...candidateData };
        this.candidates.push(newCandidate);
        return newCandidate;
    }

    public getCandidateById(candidateId: number): any {
        return this.candidates.find(candidate => candidate.id === candidateId);
    }

    public updateCandidate(candidateId: number, updatedData: any): any {
        const candidateIndex = this.candidates.findIndex(candidate => candidate.id === candidateId);
        if (candidateIndex > -1) {
            this.candidates[candidateIndex] = { ...this.candidates[candidateIndex], ...updatedData };
            return this.candidates[candidateIndex];
        }
        return null;
    }

    public deleteCandidate(candidateId: number): boolean {
        const candidateIndex = this.candidates.findIndex(candidate => candidate.id === candidateId);
        if (candidateIndex > -1) {
            this.candidates.splice(candidateIndex, 1);
            return true;
        }
        return false;
    }

    public getAllCandidates(): any[] {
        return this.candidates;
    }
}