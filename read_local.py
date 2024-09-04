# online is "hf://datasets/princeton-nlp/SWE-bench/"
# local is "~/SWE-bench"

# DATASET_PATH = "~/SWE-bench"
DATASET_PATH = "hf://datasets/princeton-nlp/SWE-bench/"

import pandas as pd

splits = {
    "dev": "data/dev-00000-of-00001.parquet",
    "test": "data/test-00000-of-00001.parquet",
    "train": "data/train-00000-of-00001.parquet",
}
df = pd.read_parquet(DATASET_PATH + splits["dev"])
print(f"We have {len(df)} rows in the dev set")
print(df.head())
print("------")

# print one example
print(df.iloc[0])