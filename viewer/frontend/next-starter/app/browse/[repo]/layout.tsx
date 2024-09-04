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

export default function BrowseLayout({ children, params }: { children: React.ReactNode, params: { repo: string } }) {
    const [testCases, setTestCases] = useState<TestCase[]>([]);
    useEffect(() => {
        getTestCases(params.repo).then((data) => {
            console.log(data)
            setTestCases(data.test_cases);
        });
    }, [params.repo]);

    return (
        <div className="flex h-screen">
            {/* Problems Column */}
            <div className="w-[400px] bg-white border-l border-r border-gray-200 p-4 overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Problems</h2>
                <ul className="space-y-2">
                    {testCases?.map((testCase) => (
                        <li key={testCase.instance_id}>
                            <Link href={`/browse/${encodeURIComponent(testCase.repo)}/${testCase.instance_id}`}
                                  className="block hover:bg-gray-100 rounded p-2 transition-colors duration-200">
                                <p className="text-sm text-gray-800 line-clamp-2">
                                    {testCase.problem_statement}
                                </p>
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