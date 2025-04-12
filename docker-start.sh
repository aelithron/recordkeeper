#!/bin/sh
set -e

if [ -d "/app/default-wiki" ] && [ -z "$(ls -A /app/wiki 2>/dev/null)" ]; then
  echo "Wiki directory is empty. Copying default files..."
  cp -r /app/default-wiki/* /app/wiki/
else
  echo "Wiki directory is not empty. Skipping default file copy."
fi
exec "$@"