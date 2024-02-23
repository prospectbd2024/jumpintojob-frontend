#!/usr/bin/env sh
FILES="-f docker-compose.yml"
NAME="jumpintojob-frontend.pid"
# if [[ ! -e .env ]]
# then
#     cp .env.example .env
# fi
# Check if the PID file exists and delete it if so
docker compose $FILES down
if [ -f "$LOCALAPPDATA/docker-compose/$NAME" ]; then
  echo "Deleting existing PID file..."
  rm "$LOCALAPPDATA/docker-compose/$NAME"
fi
echo "http://localhost:3001"

docker compose $FILES watch  
sleep 2
