import { Test } from "@/app/types";
import { useCallback } from "react";
import TestResult from "./TestResults";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface MultiTestDisplayProps {
    title: string;
    testResults: string;
    defaultPassed?: boolean;
}

const MultiTestDisplay: React.FC<MultiTestDisplayProps> = ({ title, testResults, defaultPassed = false }) => {
    const parseTests = useCallback((results: string): Test[] => {
        try {
            const parsedResults = JSON.parse(results);
            return parsedResults.map((testString: string) => {
                const [file, test_name] = testString.split('::');
                return {
                    file: file,
                    test_name: test_name,
                    args: [],
                    passed: defaultPassed
                };
            });
        } catch (error) {
            console.error('Error parsing test results:', error);
            return [];
        }
    }, []);

    const tests = parseTests(testResults);

    const groupedTests = tests.reduce((acc, test) => {
        if (!acc[test.file]) {
            acc[test.file] = { passed: [], failed: [] };
        }
        if (test.passed) {
            acc[test.file].passed.push(test);
        } else {
            acc[test.file].failed.push(test);
        }
        return acc;
    }, {} as Record<string, { passed: Test[], failed: Test[] }>);

    return (
        <Accordion type="single" collapsible className="space-y-6">
            <AccordionItem value="main">
                <AccordionTrigger className="text-xl">{title} ({tests.length} tests)</AccordionTrigger>
                <AccordionContent>
                    <Accordion type="single" collapsible className="space-y-4">
                        {Object.entries(groupedTests).map(([file, { passed, failed }], index) => (
                            <AccordionItem key={file} value={`item-${index}`}>
                                <AccordionTrigger className="text-lg font-semibold">{file} ({passed.length} passed, {failed.length} failed)</AccordionTrigger>
                                <AccordionContent>
                                    <div className="border rounded-lg p-4">
                                        {failed.length > 0 && (
                                            <div className="mb-4">
                                                <h4 className="text-md font-medium text-red-500 mb-2">Failed Tests</h4>
                                                {failed.map((test, index) => (
                                                    <TestResult key={`${file}-failed-${index}`} test={test} />
                                                ))}
                                            </div>
                                        )}
                                        {passed.length > 0 && (
                                            <div>
                                                <h4 className="text-md font-medium text-green-500 mb-2">Passed Tests</h4>
                                                {passed.map((test, index) => (
                                                    <TestResult key={`${file}-passed-${index}`} test={test} />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default MultiTestDisplay;