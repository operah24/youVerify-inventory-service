FROM node:18 AS builder

WORKDIR /usr/src/app/inventory_service

COPY package.json ./

RUN npm install

RUN npm install && npm install -g typescript

COPY . .

RUN tsc

FROM node:18-alpine AS runner

WORKDIR /usr/src/app/inventory_service

COPY --from=builder /usr/src/app/inventory_service/build ./build
COPY --from=builder /usr/src/app/inventory_service/node_modules ./node_modules
COPY package.json .

ENV NODE_ENV=production

EXPOSE 3009

CMD ["node", "build/server.js"]
