#!/bin/sh
set -e
echo "Running database migrations..."
npx prisma migrate dev
echo "Migrations finished."
exec "$@"