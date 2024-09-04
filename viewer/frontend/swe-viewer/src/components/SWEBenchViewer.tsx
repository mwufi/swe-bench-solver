import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Repository {
    id: string;
    name: string;
}

interface TestCase {
    id: string;
    name: string;
    description: string;
}

const SWEBenchViewer: React.FC = () => {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [selectedRepo, setSelectedRepo] = useState<string>('');
    const [testCases, setTestCases] = useState<TestCase[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchRepositories = async () => {
        try {
            const response = await axios.get<Repository[]>('/api/repos');
            setRepositories(response.data);
        } catch (error) {
            console.error('Error fetching repositories:', error);
        }
    };

    const fetchTestCases = async () => {
        setLoading(true);
        try {
            const url = '/api/test_cases' + (selectedRepo ? `?repo=${encodeURIComponent(selectedRepo)}` : '');
            const response = await axios.get<TestCase[]>(url);
            setTestCases(response.data);
        } catch (error) {
            console.error('Error fetching test cases:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRepositories();
    }, []);

    useEffect(() => {
        fetchTestCases();
    }, [selectedRepo]);

    return (
        <div className="swe-bench-viewer">
            <div className="filters">
                <select
                    value={selectedRepo}
                    onChange={(e) => setSelectedRepo(e.target.value)}
                >
                    <option value="">All Repositories</option>
                    {repositories.map((repo) => (
                        <option key={repo.id} value={repo.id}>{repo.name}</option>
                    ))}
                </select>
            </div>
            <div className="test-cases">
                {loading ? (
                    <div>Loading test cases...</div>
                ) : (
                    <ul>
                        {testCases.map((testCase) => (
                            <li key={testCase.id}>
                                <h3>{testCase.name}</h3>
                                <p>{testCase.description}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SWEBenchViewer;