# esbuild build
FROM library/node:18-alpine as esbuild
WORKDIR /home/node/app
COPY package*.json ./
RUN npm i
COPY . .
RUN ls -al && npm run build
RUN ls -al dist

# node
FROM library/node:18-alpine as node
COPY --from=esbuild /home/node/app/dist/ /home/node/app/dist/
WORKDIR /home/node/app
ENTRYPOINT [ "node", "dist/server.js" ]
EXPOSE 4000