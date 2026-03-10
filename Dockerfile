FROM node:18-alpine

WORKDIR /app

# Встановлення залежностей для build
RUN apk add --no-cache python3 make g++

# Копіюй package.json (package-lock.json опціонально)
COPY package.json* package-lock.json* ./

# Встановлення залежностей
RUN npm install --production=false

# Копіюй весь код
COPY . .

# Зібрати React фронтенд (якщо є src/)
RUN if [ -d "src" ]; then npm run build 2>/dev/null || true; fi

# Expose порт
EXPOSE 3000

# Змінна для production
ENV NODE_ENV=production

# Запуск API сервера
CMD ["node", "api-server.js"]
