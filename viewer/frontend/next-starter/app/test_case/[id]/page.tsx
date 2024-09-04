import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface TestCaseProps {
  testCase: {
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
  };
}

const TestCaseDisplay: React.FC<TestCaseProps> = ({ testCase }) => {
  return (
    <Card className="w-full max-w-3xl mx-auto">
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
          <p className="mt-1 text-gray-600">{testCase.problem_statement}</p>
        </div>
        <Separator />
        <div>
          <h3 className="text-lg font-semibold">Commit Information</h3>
          <p className="mt-1 text-gray-600">Base Commit: {testCase.base_commit}</p>
          <p className="mt-1 text-gray-600">Environment Setup Commit: {testCase.environment_setup_commit}</p>
        </div>
        <Separator />
        <div>
          <h3 className="text-lg font-semibold">Patch Information</h3>
          <p className="mt-1 text-gray-600">Patch Length: {testCase.patch.length} characters</p>
          <p className="mt-1 text-gray-600">Test Patch Length: {testCase.test_patch.length} characters</p>
        </div>
        <Separator />
        <div>
          <h3 className="text-lg font-semibold">Test Results</h3>
          <p className="mt-1 text-gray-600">FAIL_TO_PASS: {testCase.FAIL_TO_PASS}</p>
          <p className="mt-1 text-gray-600">PASS_TO_PASS: {testCase.PASS_TO_PASS}</p>
        </div>
        <Separator />
        <div>
          <h3 className="text-lg font-semibold">Hints</h3>
          <p className="mt-1 text-gray-600">{testCase.hints_text}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestCaseDisplay;
