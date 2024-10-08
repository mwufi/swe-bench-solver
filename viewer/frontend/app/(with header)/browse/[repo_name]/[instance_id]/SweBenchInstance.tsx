import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TestCase } from '@/app/types';
import MultiTestDisplay from './MultiTestDisplay';
import MarkdownPreviewer from './MarkdownPreviewer';
import DiffView from './DiffView';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface TestCaseProps {
    testCase: TestCase;
}

const SweBenchInstance: React.FC<TestCaseProps> = ({ testCase }) => {
    return (
        <Card className="w-full container mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">{testCase.repo}</CardTitle>
                <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{testCase.version}</Badge>
                    <Badge variant="outline">{new Date(testCase.created_at).toLocaleDateString()}</Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h3 className="text-lg font-semibold">Problem Statement</h3>
                    <MarkdownPreviewer markdown={testCase.problem_statement} />
                </div>
                <Separator />
                <div>
                    <h3 className="text-lg font-semibold">Commit Information</h3>
                    <p className="mt-1 text-gray-600">Base Commit: <a href={`https://github.com/${testCase.repo}/commit/${testCase.base_commit}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{testCase.base_commit}</a></p>
                    <p className="mt-1 text-gray-600">Environment Setup Commit: <a href={`https://github.com/${testCase.repo}/commit/${testCase.environment_setup_commit}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{testCase.environment_setup_commit}</a></p>
                </div>
                <Separator />
                <div>
                    <h3 className="text-lg font-semibold">Patch Information</h3>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="patch">
                            <AccordionTrigger>Patch Lines: {testCase.patch?.split('\n').length} lines</AccordionTrigger>
                            <AccordionContent>
                                <DiffView diffText={testCase.patch} baseUrl={`https://github.com/${testCase.repo}/tree/${testCase.base_commit}`} />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="patch">
                            <AccordionTrigger>Test Patch Lines: {testCase.test_patch?.split('\n').length} lines</AccordionTrigger>
                            <AccordionContent>
                                <DiffView diffText={testCase.test_patch} baseUrl={`https://github.com/${testCase.repo}/tree/${testCase.environment_setup_commit}`} />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                <Separator />
                <div>
                    <h3 className="text-lg font-semibold">Test Results</h3>
                    <MultiTestDisplay title="FAIL -> PASS" testResults={testCase.FAIL_TO_PASS} defaultPassed={true} />
                    <MultiTestDisplay title="PASS -> PASS" testResults={testCase.PASS_TO_PASS} defaultPassed={true} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Hints</h3>
                    <MarkdownPreviewer markdown={testCase.hints_text} />
                </div>
            </CardContent>
        </Card>
    );
};

export default SweBenchInstance;
