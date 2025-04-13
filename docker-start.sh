#!/bin/sh
set -e

echo "Fixing permissions on /app/wiki..."
chown -R nextjs:nodejs /app/wiki
chmod -R 777 /app/wiki

if [ -z "$(ls -A /app/wiki 2>/dev/null)" ]; then
  echo "Wiki directory is empty. Copying default files..."
  cp -r /app/default-wiki/* /app/wiki/
else
  echo "Wiki directory is not empty. Skipping default file copy."
fi
exec su-exec nextjs "$@"