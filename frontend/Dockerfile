# Stage 1: Base image for development and production
FROM node:18-alpine AS base
WORKDIR /app
COPY package-lock.json ./
RUN npm install
COPY index.html tsconfig.app.json tsconfig.json tsconfig.node.json vite.config.ts ./
COPY src ./src
COPY public ./public

# Stage 2: Development mode
FROM base AS dev
ENV NODE_ENV=development
EXPOSE 4000
CMD ["npm", "run", "dev"]