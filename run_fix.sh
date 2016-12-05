#!/bin/bash

# Exit if a command exits with a non-zero status
set -e

# Wait for postgres to get started
sleep 10
# Migrate the database schema for production
npm run migratedb-prod
# Run the app
node run.js

exit 0
