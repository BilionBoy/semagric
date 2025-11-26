FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* ./

RUN npm install --legacy-peer-deps

COPY . .

ENV NODE_ENV=production
ENV PORT=3004

RUN npm run build

EXPOSE 3004

CMD ["npm", "start"]
