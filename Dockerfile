FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* ./

RUN npm install --legacy-peer-deps

COPY . .

ENV NODE_ENV=production
ENV PORT=3001

RUN npm run build

EXPOSE 3001

CMD ["npm", "start", "--", "-p", "3001"]
