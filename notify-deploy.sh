#!/bin/bash
# Vercel Deployment Notification Script
# Waits for typical deployment time then plays soft notification

sleep 90  # Typical Vercel deployment takes 60-120 seconds

# Play soft notification sound (Purr is gentler than Glass)
afplay /System/Library/Sounds/Purr.aiff

# Optional: Display notification (if terminal-notifier is installed)
# terminal-notifier -title "Vercel" -message "Deployment complete" 2>/dev/null || true
