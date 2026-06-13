FROM node:22-alpine

WORKDIR /app

ENV CI=true \
    EXPO_NO_TELEMETRY=1 \
    EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0 \
    HOST=0.0.0.0

COPY package*.json ./
RUN npm ci
RUN npm install -g @expo/ngrok@^4.1.0

COPY . .

EXPOSE 8081 19000 19001 19002

CMD ["npm", "run", "start", "--", "--tunnel"]