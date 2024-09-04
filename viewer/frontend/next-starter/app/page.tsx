import React from 'react';
import Link from 'next/link';

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

async function getRepositories(): Promise<Repository[]> {
  try {
    const response = await fetch('http://localhost:8000/repos');
    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }
    const data = await response.json();
    return data.repos;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
}

async function getTestCases(selectedRepo: string = ''): Promise<TestCase[]> {
  try {
    const url = 'http://localhost:8000/test_cases' + (selectedRepo ? `?repo=${encodeURIComponent(selectedRepo)}` : '');
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch test cases');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching test cases:', error);
    return [];
  }
}

export default async function SWEBenchViewer() {
  const repositories = await getRepositories();
  const testCases = await getTestCases();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">SWE-bench Dataset Viewer</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option value="">All Repositories</option>
                  {repositories.map((repo) => (
                    <option key={repo.id} value={repo.id}>{repo.name}</option>
                  ))}
                </select>
              </div>
              <ul className="divide-y divide-gray-200">
                {testCases.map((testCase) => (
                  <li key={testCase.instance_id}>
                    <Link href={`/test_case/${testCase.instance_id}`} className="block hover:bg-gray-50">
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-indigo-600 truncate">{testCase.repo}</p>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {testCase.version}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              Commit: {testCase.base_commit.substring(0, 7)}
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                              Patch: {testCase.patch.length} chars
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <p>
                              {new Date(testCase.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{testCase.problem_statement}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}