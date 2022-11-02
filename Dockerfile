# build stage
FROM node:16-alpine

WORKDIR /app
# build server
COPY src ./src
COPY package*.json .
COPY tsconfig.json .
RUN npm install
RUN npm run build
RUN ls
# build frontend
WORKDIR /app/client
COPY client /app/client
COPY client/package*json /app/client
COPY client/tsconfig.json .
RUN npm install
RUN npm run build

# deploy stage
FROM node:16-alpine3.11
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY --from=0 /app/dist/src /app/dist
WORKDIR /app/client
COPY /client/package*.json .
RUN npm ci
COPY --from=0 /app/client/build /app/client/build

# expose ports
EXPOSE 8080 2222 3001
# start the server
WORKDIR /app
CMD ["npm", "run", "prodstart"]