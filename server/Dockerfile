FROM node:24.3.0
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm ci --omit=dev
CMD ["npm","run", "start:prod"]