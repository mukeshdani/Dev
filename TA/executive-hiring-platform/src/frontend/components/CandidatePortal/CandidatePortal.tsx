import React, { useState, useEffect } from 'react';
import { CandidateService } from '../../../backend/services/candidate/candidateService';

const CandidatePortal = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const service = new CandidateService();
                const data = await service.getCandidates();
                setCandidates(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCandidates();
    }, []);

    const handleApply = async (candidateId) => {
        // Logic for applying to a job
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Candidate Portal</h1>
            <ul>
                {candidates.map(candidate => (
                    <li key={candidate.id}>
                        {candidate.name}
                        <button onClick={() => handleApply(candidate.id)}>Apply</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CandidatePortal;