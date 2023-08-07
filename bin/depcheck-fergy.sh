#!/bin/bash

# Replace "YOUR_COMMAND_HERE" with the command you want to run in each subdirectory
COMMAND_TO_RUN="depcheck . --specials=babel,bin,eslint,husky,jest,lint-staged,prettier,webpack"

# Replace "YOUR_DIRECTORY_HERE" with the specific directory path you want to target
TARGET_DIRECTORY="/Users/abb2175/work/fergy-web-platform/packages"

# Check if the target directory exists
if [ ! -d "$TARGET_DIRECTORY" ]; then
  echo "Directory not found: $TARGET_DIRECTORY"
  exit 1
fi

# Loop through each subdirectory in the target directory
for subdir in "$TARGET_DIRECTORY"/*/; do
  if [ -d "$subdir" ]; then
    # Change into the subdirectory and run the specified command
    pushd "$subdir" >/dev/null
    echo "=================================================="
    echo "RUNNING IN $subdir"
    $COMMAND_TO_RUN
    echo 
    echo
    popd >/dev/null
  fi
done
