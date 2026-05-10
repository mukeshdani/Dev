FROM node:latest AS mukesh

WORKDIR /dhondu

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine AS suraj

COPY --from=mukesh /dhondu/build /usr/share/nginx/html
