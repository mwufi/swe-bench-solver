import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Repository {
    id: string;
    name: string;
}

interface TestCase {
    repo: string;
    instance_id: string;
    base_commit: string;
    patch: string;
    test_patch: string;
    problem_statement: string;
    hints_text: string;
    created_at: string;
    version: string;
    FAIL_TO_PASS: string;
    PASS_TO_PASS: string;
    environment_setup_commit: string;
}

const SWEBenchViewer: React.FC = () => {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [selectedRepo, setSelectedRepo] = useState<string>('');
    const [testCases, setTestCases] = useState<TestCase[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchRepositories = async () => {
        try {
            const response = await axios.get<{ repos: Repository[] }>('/api/repos');
            if (response.data) {
                const { repos } = response.data
                console.log("response", repos)
                setRepositories(repos);
            }
        } catch (error) {
            console.error('Error fetching repositories:', error);
        }
    };

    const fetchTestCases = async () => {
        setLoading(true);
        try {
            const url = '/api/test_cases' + (selectedRepo ? `?repo=${encodeURIComponent(selectedRepo)}` : '');
            const response = await axios.get<TestCase[]>(url);
            console.log("response test_cases", response.data)
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
                            <li key={testCase.instance_id} className="flex justify-between items-start p-4 border-b border-gray-200 hover:bg-gray-50">
                                <div className="flex-1 mr-4">
                                    <h3 className="text-lg font-semibold text-gray-800">{testCase.repo}</h3>
                                    <p className="mt-1 text-sm text-gray-600 line-clamp-3">{testCase.problem_statement}</p>
                                </div>
                                <div className="flex flex-col items-end text-sm text-gray-500">
                                    <span className="font-medium">{testCase.repo}</span>
                                    <span className="mt-1">Commit: {testCase.base_commit.substring(0, 7)}</span>
                                    <span className="mt-1">Patch: {testCase.patch.length} chars</span>
                                    <span className="mt-1">{new Date(testCase.created_at).toLocaleDateString()}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SWEBenchViewer;