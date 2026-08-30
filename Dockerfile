FROM node:24-alpine
WORKDIR /abricot

COPY backend ./backend
COPY frontend ./frontend

WORKDIR /abricot/backend

RUN cp .env.example .env

RUN npm install
RUN npm run db:generate
RUN npm run db:push
RUN npm run seed
RUN npm run build

WORKDIR /abricot/frontend
RUN npm install
RUN npm run build
WORKDIR /abricot

EXPOSE 3000

CMD ["sh", "-c", "npm --prefix /abricot/backend start & npm --prefix /abricot/frontend start & wait -n"]