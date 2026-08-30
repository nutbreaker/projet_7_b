FROM node:24-alpine
WORKDIR /app

COPY backend ./backend
COPY frontend ./frontend

WORKDIR /app/backend

RUN cp .env.example .env

RUN npm install
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npm run seed
RUN npm run build

WORKDIR /app/frontend
RUN npm install
RUN npm run build
WORKDIR /app

EXPOSE 3000

CMD ["sh", "-c", "npm --prefix /app/backend start & npm --prefix /app/frontend start & wait -n"]