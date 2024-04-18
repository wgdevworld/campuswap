import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import connectDB from "./config/db";
import multer from "multer";
import expressPlayground from "graphql-playground-middleware-express";
import { uploadToFirebaseStorage } from "./config/GoogleCloud";

const startServer = async () => {
  const app = express();
  const upload = multer({ dest: "uploads/" });

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
  app.post("/api/upload", upload.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        res.status(400).json({ error: "Invalid file" });
        return;
      }
      const mediaLink = await uploadToFirebaseStorage(file.path, file.filename);
      res.status(200).json({ imageUrl: mediaLink });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });
};

startServer();
