import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Test } from '@/app/types';

interface TestResultProps {
    test: Test;
}

const TestResult: React.FC<TestResultProps> = ({ test }) => {
    return (
        <div className="flex items-center space-x-2 py-2">
            {test.passed ? (
                <CheckCircle className="text-green-500 h-5 w-5" />
            ) : (
                <XCircle className="text-red-500 h-5 w-5" />
            )}
            <div className="flex-grow">
                <p className="font-medium">{test.file}</p>
                <p className="text-sm text-gray-600">{test.test_name}</p>
                {test.args.length > 0 && (
                    <p className="text-xs text-gray-500">Args: {test.args.join(', ')}</p>
                )}
            </div>
        </div>
    );
};


export default TestResult;
