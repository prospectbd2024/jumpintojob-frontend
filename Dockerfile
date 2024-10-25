FROM  node:18.20.2-alpine

WORKDIR /app

RUN apk add --no-cache bash

COPY package*.json ./

RUN npm install --loglevel verbose

COPY . .

EXPOSE 3000

CMD npm run dev