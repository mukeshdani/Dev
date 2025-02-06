export interface Candidate {
    id: string;
    name: string;
    email: string;
    phone: string;
    resume: string;
    applicationStatus: 'applied' | 'interviewing' | 'hired' | 'rejected';
    createdAt: Date;
    updatedAt: Date;
}

export class CandidateModel {
    private candidates: Candidate[] = [];

    public create(candidate: Omit<Candidate, 'id' | 'createdAt' | 'updatedAt'>): Candidate {
        const newCandidate: Candidate = {
            id: this.generateId(),
            createdAt: new Date(),
            updatedAt: new Date(),
            ...candidate,
        };
        this.candidates.push(newCandidate);
        return newCandidate;
    }

    public read(id: string): Candidate | undefined {
        return this.candidates.find(candidate => candidate.id === id);
    }

    public update(id: string, updatedData: Partial<Omit<Candidate, 'id' | 'createdAt' | 'updatedAt'>>): Candidate | undefined {
        const candidate = this.read(id);
        if (candidate) {
            Object.assign(candidate, updatedData, { updatedAt: new Date() });
            return candidate;
        }
        return undefined;
    }

    public delete(id: string): boolean {
        const index = this.candidates.findIndex(candidate => candidate.id === id);
        if (index !== -1) {
            this.candidates.splice(index, 1);
            return true;
        }
        return false;
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}