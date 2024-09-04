import { Repository } from '@/app/types';

async function getRepositories(): Promise<{ repos: Repository[], id: string, split: string }> {
    try {
        const response = await fetch('http://localhost:8000/repos');
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();
        return { repos: data.repos, id: data.id, split: data.split };
    } catch (error) {
        console.error('Error fetching repositories:', error);
        return { repos: [], id: '', split: '' };
    }
}

import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default async function BrowseLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const repositories = await getRepositories();

    return (
        <div className="flex h-screen">
            {/* Repositories Column */}
            <div className="w-[230px] bg-gray-100 overflow-y-auto">
                <Link href="/browse" className="block">
                    <h2 className="text-lg font-semibold mb-4 text-left p-4 hover:underline">SWE Bench Viewer</h2>
                </Link>
                <div className="px-4 mb-4">
                    <p className="text-sm font-medium">Current Dataset:</p>
                    <p className="text-sm">{repositories.id}</p>
                    <p className="text-sm font-medium mt-2">Split:</p>
                    <p className="text-sm">{repositories.split}</p>
                </div>
                <ul className="text-left">
                    {repositories.repos.map((repo) => (
                        <li key={repo.id} className="py-2">
                            <Link href={`/browse/${encodeURIComponent(repo.name)}`} passHref>
                                <Button variant="ghost" className="w-full text-left justify-start">
                                    {repo.name}
                                </Button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
        </div>
    );
}
