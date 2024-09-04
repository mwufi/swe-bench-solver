
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown } from "lucide-react";
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
            <Collapsible className="w-[200px] bg-gray-100 p-4 overflow-y-auto">
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full flex justify-between items-center mb-2">
                        <span>Repositories</span>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <ul>
                        {repositories.map((repo) => (
                            <li key={repo.id} className="py-2">
                                <Link href={`/browse/${encodeURIComponent(repo.name)}`} passHref>
                                    <Button variant="ghost" className="w-full text-left">
                                        {repo.name}
                                    </Button>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </CollapsibleContent>
            </Collapsible>
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
        </div>
    );
}
