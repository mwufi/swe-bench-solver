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
        <div className="flex">
            {/* Problems Column */}
            <div className="w-1/4 bg-white border-l border-r border-gray-200 p-4 overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Problems</h2>
                <ul>
                    {testCases?.map((testCase) => (
                        <li key={testCase.instance_id} className="py-2">
                            <Button variant="ghost" className="w-full text-left" asChild>
                                <Link href={`/browse/${encodeURIComponent(testCase.repo)}/${testCase.instance_id}`}>
                                    {testCase.problem_statement.substring(0, 50)}...
                                </Link>
                            </Button>
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