FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

RUN npx prisma generate
RUN npm run build


FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY server ./server
COPY prisma ./prisma
COPY tsconfig*.json ./

COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 3000
CMD ["npm", "run", "start"]
