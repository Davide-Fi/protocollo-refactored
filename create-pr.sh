#!/bin/bash

# Check if commit message is provided
if [ -z "$1" ]; then
    echo "Usage: ./create-pr.sh <commit-message>"
    echo "Example: ./create-pr.sh 'Add new feature'"
    exit 1
fi

COMMIT_MESSAGE=$1

# Check if there are changes to commit
if [ -n "$(git status --porcelain)" ]; then
    # Add all changes
    git add .
    
    # Commit with message
    git commit -m "$COMMIT_MESSAGE"
fi

# Push to origin
git push

echo "Changes pushed to main branch."