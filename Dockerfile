FROM node:24-alpine
WORKDIR /app

COPY backend ./backend
COPY frontend ./frontend

WORKDIR /app/backend
RUN npm install
RUN npx prisma generate
RUN npm run build

WORKDIR /app/frontend
RUN npm install
RUN npm run build
WORKDIR /app

EXPOSE 3000

CMD ["sh", "-c", "npm --prefix /app/backend start & npm --prefix /app/frontend start & wait -n"]