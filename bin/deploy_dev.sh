#!/usr/bin/env sh
FILES="-f docker-compose.yml"

# if [[ ! -e .env ]]
# then
#     cp .env.example .env
# fi

docker compose $FILES down
docker compose $FILES up -d --build --remove-orphans
sleep 2
echo "http://localhost:3001"
