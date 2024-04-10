import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import connectDB from "./config/db";
import expressPlayground from "graphql-playground-middleware-express";

const startServer = async () => {
  const app = express();

  await connectDB();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app
    .listen(PORT, () => {
      console.log(
        `🚀 Server running on http://localhost:${PORT}${apolloServer.graphqlPath}`
      );
    })
    .on("error", (error) => {
      console.error("Failed to start server:", error);
    });
  app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
  });
  app.get("/playground", expressPlayground({ endpoint: "/graphql" }));
};

startServer();
