FROM node:16

WORKDIR /app

COPY package*.json /app/
RUN npm ci --production
# install client deps
COPY client/package*.json /app/client/
WORKDIR /app/client
RUN npm ci --production

WORKDIR /app/
# systems stuff
RUN echo y | apt update
RUN echo y | apt upgrade

COPY . .
# compile TypeScript
RUN npm install -g typescript ts-node
RUN tsc
#build the frontend
WORKDIR /app/client
RUN npm run build

# expose ports
EXPOSE 8080 2222 3001
# start the server
WORKDIR /app
CMD ["npm", "start"]