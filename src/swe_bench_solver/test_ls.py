# Tests for excluding patterns
import os
import tempfile
import shutil
from swe_bench_solver.ls import files_list


def create_test_directory_structure(tmpdir):
    # File structure:
    # tmpdir/
    # ├── .gitignore
    # ├── dir1/
    # │   └── file3.txt
    # ├── dir2/
    # │   └── file4.py
    # ├── file1.txt
    # └── file2.py
    os.makedirs(os.path.join(tmpdir, "dir1"))
    os.makedirs(os.path.join(tmpdir, "dir2"))
    open(os.path.join(tmpdir, "file1.txt"), "w").close()
    open(os.path.join(tmpdir, "file2.py"), "w").close()
    open(os.path.join(tmpdir, "dir1", "file3.txt"), "w").close()
    open(os.path.join(tmpdir, "dir2", "file4.py"), "w").close()


def test_files_list_no_exclude_patterns():
    with tempfile.TemporaryDirectory() as tmpdir:
        create_test_directory_structure(tmpdir)
        files = files_list(tmpdir)
        assert len(files) == 4


def test_files_list_exclude_specific_file():
    with tempfile.TemporaryDirectory() as tmpdir:
        create_test_directory_structure(tmpdir)
        files = files_list(tmpdir, ["file1.txt"])
        assert len(files) == 3
        assert all(file.name != "file1.txt" for file in files)


def test_files_list_exclude_directory():
    with tempfile.TemporaryDirectory() as tmpdir:
        create_test_directory_structure(tmpdir)
        files = files_list(tmpdir, ["dir1"])
        assert len(files) == 3
        assert all("dir1" not in file.fullpath for file in files)


def test_files_list_exclude_by_extension():
    with tempfile.TemporaryDirectory() as tmpdir:
        create_test_directory_structure(tmpdir)
        files = files_list(tmpdir, ["*.py"])
        assert len(files) == 2
        assert all(file.type != "py" for file in files)


def test_files_list_multiple_exclude_patterns():
    with tempfile.TemporaryDirectory() as tmpdir:
        create_test_directory_structure(tmpdir)
        files = files_list(tmpdir, ["*.py", "dir2"])
        assert len(files) == 2
        assert all(file.type != "py" and "dir2" not in file.fullpath for file in files)


def test_files_list_with_gitignore():
    with tempfile.TemporaryDirectory() as tmpdir:
        create_test_directory_structure(tmpdir)
        with open(os.path.join(tmpdir, ".gitignore"), "w") as f:
            f.write("*.txt\n")
            f.write("dir1\n")
        files = files_list(tmpdir)
        assert len(files) == 2
        assert all(file.type != "txt" and "dir1" not in file.fullpath for file in files)


if __name__ == "__main__":
    # Run the test
    test_files_list_no_exclude_patterns()
    test_files_list_exclude_specific_file()
    test_files_list_exclude_directory()
    test_files_list_exclude_by_extension()
    test_files_list_multiple_exclude_patterns()
    test_files_list_with_gitignore()

    print("All tests passed!")
