# esbuild build
FROM library/node:18-alpine as esbuild
WORKDIR /home/node/app
COPY package*.json ./
RUN npm i
COPY . .
COPY /campuswap-05910bbb9d29.json /home/node/app/campuswap-05910bbb9d29.json
RUN ls -al && npm run build
RUN ls -al dist

# node
FROM library/node:18-alpine as node
COPY --from=esbuild /home/node/app/dist/ /home/node/app/dist/
COPY --from=esbuild /home/node/app/campuswap-05910bbb9d29.json /home/node/app/campuswap-05910bbb9d29.json
WORKDIR /home/node/app
ENTRYPOINT [ "node", "dist/server.js" ]
EXPOSE 4000