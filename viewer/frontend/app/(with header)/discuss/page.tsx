import React from 'react';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Mock data for forum topics
const topics = [
    { id: 1, title: "Getting started with SWE Bench", author: "Alice", replies: 5 },
    { id: 2, title: "Best practices for code review", author: "Bob", replies: 3 },
    { id: 3, title: "Debugging techniques", author: "Charlie", replies: 7 },
];

export default function DiscussPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">SWE Bench Forum</h1>

            {/* New Topic Form */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Start a New Topic</h2>
                <Input className="mb-2" placeholder="Topic Title" />
                <textarea
                    className="w-full p-2 border rounded mb-2"
                    rows={3}
                    placeholder="Topic Description"
                ></textarea>
                <Button>Submit New Topic</Button>
            </div>

            {/* Topics List */}
            <div>
                <h2 className="text-xl font-semibold mb-2">Recent Topics</h2>
                <ul>
                    {topics.map(topic => (
                        <li key={topic.id} className="border-b py-2">
                            <Link href={`/discuss/${topic.id}`} className="text-blue-600 hover:underline">
                                {topic.title}
                            </Link>
                            <p className="text-sm text-gray-600">
                                Posted by {topic.author} | {topic.replies} replies
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
