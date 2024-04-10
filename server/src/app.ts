import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import connectDB from "./config/db";

const startServer = async () => {
  const app = express();

  await connectDB();

  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(
      `🚀 Server running on http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
};

startServer();
