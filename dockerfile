
FROM  node:18-alpine as BUILD_IMAGE
WORKDIR /app/client
COPY package*.json ./
RUN npm install
COPY . .
ENV VITE_GUESTBOOK_TITLE=Guestbook
RUN npm run build 

FROM node:18-alpine as PRODUCTION_IMAGE
WORKDIR /app/client
COPY --from=BUILD_IMAGE /app/client/dist /app/client/dist/
EXPOSE 8080 
COPY package*.json  .
COPY vite.config.js .
EXPOSE 8080 
COPY --from=BUILD_IMAGE /app/client/node_modules /app/client/node_modules
CMD [ "npm","run","preview" ]