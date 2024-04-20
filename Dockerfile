FROM node:20.10.0-alpine3.18 as builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build

FROM node:20.10.0-alpine3.18

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/next ./next

EXPOSE 3000

CMD ["yarn", "run", "start"]