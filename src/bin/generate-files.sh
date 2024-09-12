#!/bin/bash

# Usage: ./generate_files.sh <number_of_files> <file_prefix>
# Example: ./generate_files.sh 10 testfile

# Check if the correct number of arguments is provided
if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <number_of_files> <file_prefix>"
  exit 1
fi

# Read the arguments
number_of_files=$1
file_prefix=$2

# Generate the specified number of files
for ((i = 1; i <= number_of_files; i++)); do
  file_name="${file_prefix}_${i}.txt"
  echo "This is file number $i" > "$file_name"
  echo "Created file: $file_name"
done

echo "Generated $number_of_files files with prefix '$file_prefix'."