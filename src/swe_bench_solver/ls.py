import os
from dataclasses import dataclass
from typing import List, Optional
import fnmatch


@dataclass
class File:
    name: str
    fullpath: str
    size: int
    n_lines: int
    type: str


def count_lines(file_path: str) -> int:
    with open(file_path, "r") as f:
        return sum(1 for _ in f)


def files_list(dir: str, exclude_patterns: List[str] = None) -> List[File]:
    if exclude_patterns is None:
        exclude_patterns = []

    # Read .gitignore patterns if it exists
    gitignore_path = os.path.join(dir, ".gitignore")
    if os.path.exists(gitignore_path):
        with open(gitignore_path, "r") as f:
            exclude_patterns.extend(line.strip() for line in f if line.strip() and not line.startswith("#"))

    result = []
    for root, dirs, files in os.walk(dir):
        # Filter out directories based on exclude patterns and ignore hidden directories
        dirs[:] = [
            d
            for d in dirs
            if not d.startswith(".")
            and not any(d == pattern or fnmatch.fnmatch(d, pattern) for pattern in exclude_patterns)
        ]

        for file in files:
            # Ignore hidden files and check if the file matches any exclude pattern
            if file.startswith(".") or any(fnmatch.fnmatch(file, pattern) for pattern in exclude_patterns):
                continue

            full_path = os.path.join(root, file)
            file_size = os.path.getsize(full_path)
            file_type = os.path.splitext(file)[1][1:]  # Remove the dot
            try:
                n_lines = count_lines(full_path)
            except:
                n_lines = 0
            result.append(File(name=file, fullpath=full_path, size=file_size, n_lines=n_lines, type=file_type))

    return result
