import { TestCase } from '@/app/types';
import React from 'react';
import SweBenchInstance from './SweBenchInstance';

async function getTestCase(instance_id: string): Promise<TestCase> {
    try {
        const response = await fetch(`http://localhost:8000/test_case/${instance_id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch test case');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching test case:', error);
        throw error;
    }
}

export default async function Page({ params }: { params: { instance_id: string } }) {
    const testCase = await getTestCase(params.instance_id);
    console.log("testCase", testCase)
    return (
        <SweBenchInstance testCase={testCase} />
    )
}   