from fastapi import FastAPI, Query
from pydantic import BaseModel
from typing import List, Optional
import json
from datetime import datetime

app = FastAPI()


class TestCase(BaseModel):
    repo: str
    instance_id: str
    base_commit: str
    patch: str
    test_patch: str
    problem_statement: str
    hints_text: str
    created_at: str
    version: str
    FAIL_TO_PASS: str
    PASS_TO_PASS: str
    environment_setup_commit: str


def load_testcases():
    import pandas as pd

    DATASET_PATH = "hf://datasets/princeton-nlp/SWE-bench/"
    splits = {
        "dev": "data/dev-00000-of-00001.parquet",
        "test": "data/test-00000-of-00001.parquet",
        "train": "data/train-00000-of-00001.parquet",
    }
    df = pd.read_parquet(DATASET_PATH + splits["dev"])
    return [TestCase(**tc) for tc in df.to_dict("records")]


# Load test cases
test_cases = load_testcases()


@app.get("/test_cases", response_model=List[TestCase])
async def get_test_cases(
    repo: Optional[str] = Query(None, description="Filter by repository"),
    min_patch_length: Optional[int] = Query(None, description="Minimum patch length"),
    max_patch_length: Optional[int] = Query(None, description="Maximum patch length"),
):
    filtered_cases = test_cases

    if repo:
        filtered_cases = [tc for tc in filtered_cases if tc.repo == repo]

    if min_patch_length is not None:
        filtered_cases = [tc for tc in filtered_cases if len(tc.patch) >= min_patch_length]

    if max_patch_length is not None:
        filtered_cases = [tc for tc in filtered_cases if len(tc.patch) <= max_patch_length]

    return filtered_cases


@app.get("/repos", response_model=List[str])
async def get_repos():
    return list(set(tc.repo for tc in test_cases))



if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
