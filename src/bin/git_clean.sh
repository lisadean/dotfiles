#! /usr/bin/env bash

# Run the dry-run to show what will be deleted
git clean -d -n

# Ask the user if they want to proceed with the actual deletion
echo "Do you want to delete these files for real? (Y/N)"
read -r response

# Check the user's response
if [[ "$response" == "Y" || "$response" == "y" ]]; then
  # Run the actual deletion
  git clean -d -f
else
  echo "Operation cancelled."
fi