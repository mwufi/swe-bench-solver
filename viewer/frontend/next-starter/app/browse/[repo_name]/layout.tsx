'use client'
import { TestCase } from "@/app/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

async function getTestCases(selectedRepo: string = ''): Promise<{ test_cases: TestCase[] }> {
    try {
        const url = 'http://localhost:8000/test_cases' + (selectedRepo ? `?repo=${encodeURIComponent(selectedRepo)}` : '');
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch test cases');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching test cases:', error);
        return { test_cases: [] };
    }
}

export default function BrowseLayout({ children, params }: { children: React.ReactNode, params: { repo_name: string } }) {
    const [testCases, setTestCases] = useState<TestCase[]>([]);
    useEffect(() => {
        getTestCases(params.repo_name).then((data) => {
            console.log(data)
            setTestCases(data.test_cases);
        });
    }, [params.repo_name]);

    return (
        <div className="flex h-screen">
            {/* Problems Column */}
            <div className="w-[400px] bg-white border-l border-r border-gray-200 p-4 overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                    Problems
                    <span className="ml-2 px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                        {testCases.length}
                    </span>
                </h2>
                <ul className="space-y-2">
                    {testCases?.map((testCase) => (
                        <li key={testCase.instance_id}>
                            <Link href={`/browse/${encodeURIComponent(testCase.repo)}/${testCase.instance_id}`}
                                className="block hover:bg-gray-100 rounded p-2 transition-colors duration-200">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm font-medium text-gray-800 line-clamp-2 flex-grow">
                                        {testCase.issue_name || testCase.problem_statement}
                                    </p>
                                    <span className="text-xs font-semibold text-gray-500 ml-2">
                                        #{testCases.indexOf(testCase) + 1}
                                    </span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6 overflow-y-auto">
                {children}
            </div>
        </div>
    );
}