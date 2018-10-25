FROM node:10.7

WORKDIR /app/server
COPY server .
RUN npm i
RUN npm run build
RUN npm rebuild

WORKDIR /app/ui
COPY ui .
RUN npm i
RUN npm run build
RUN npm rebuild


EXPOSE 8080 3000
