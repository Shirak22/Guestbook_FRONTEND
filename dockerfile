
FROM  node:latest as BUILD_IMAGE
WORKDIR /app/client
COPY package*.json ./
RUN apt-get update && apt-get install -y python3
RUN npm install
COPY . .
ENV VITE_GUESTBOOK_BACKEND_HOST=localhost
RUN npm run build 

FROM node:latest as PRODUCTION_IMAGE
WORKDIR /app/client
COPY --from=BUILD_IMAGE /app/client/dist /app/client/dist/
EXPOSE 8080 
COPY package*.json  .
COPY vite.config.js .
EXPOSE 8080
COPY --from=BUILD_IMAGE /app/client/node_modules /app/client/node_modules
CMD [ "npm","run","preview" ]