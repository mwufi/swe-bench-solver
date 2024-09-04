export interface Repository {
    id: string;
    name: string;
}

export interface TestCase {
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
}

// a single test result
export interface Test {
    file: string;
    test_name: string;
    args: string[];

    // they can have a status
    passed: boolean;
}
