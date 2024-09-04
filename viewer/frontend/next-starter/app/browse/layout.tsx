import { Repository, TestCase } from '@/app/types';

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
                <h2 className="text-lg font-semibold mb-4 text-left p-4">Repositories</h2>
                <ul className="text-left">
                    {repositories.map((repo) => (
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
