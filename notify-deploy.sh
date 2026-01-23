#!/bin/bash
# Vercel Deployment Notification Script
# Monitors GitHub deployment status and plays sound when complete

REPO="tebrizzy/rizztoday"
COMMIT_SHA=$(git rev-parse HEAD)

echo "Monitoring deployment for commit: ${COMMIT_SHA:0:7}"

# Poll GitHub API for deployment status
MAX_ATTEMPTS=60  # 5 minutes max (60 * 5 seconds)
ATTEMPT=0

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
    # Get latest deployment for this commit
    DEPLOYMENT_ID=$(curl -s "https://api.github.com/repos/$REPO/deployments?sha=$COMMIT_SHA&per_page=1" \
        | grep -m 1 '"id":' \
        | grep -o '[0-9]*')

    if [ -n "$DEPLOYMENT_ID" ]; then
        # Check deployment status
        STATE=$(curl -s "https://api.github.com/repos/$REPO/deployments/$DEPLOYMENT_ID/statuses?per_page=1" \
            | grep -m 1 '"state":' \
            | sed -E 's/.*"state": "([^"]+)".*/\1/')

        if [ "$STATE" = "success" ]; then
            afplay /System/Library/Sounds/Purr.aiff
            exit 0
        elif [ "$STATE" = "failure" ] || [ "$STATE" = "error" ]; then
            exit 1
        fi
    fi

    sleep 5
    ATTEMPT=$((ATTEMPT + 1))
done

# Timeout after 5 minutes
exit 1
