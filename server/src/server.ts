import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import connectDB from "./config/db";
import multer from "multer";
import expressPlayground from "graphql-playground-middleware-express";
import { uploadToFirebaseStorage } from "./config/GoogleCloud";
import User from "./models/User";
import bcrypt from "bcryptjs";
import MongoStore from "connect-mongo";
import passport from "passport";
import passportlocal from "passport-local";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import bodyParser from "body-parser";
import pino from "pino";
import expressPinoLogger from "express-pino-logger";

require("dotenv").config();

const startServer = async () => {
  const app = express();
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:31000",
    })
  );

  const DB_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/campuswap";
  console.log(DB_URL);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: DB_URL,
        ttl: 14 * 24 * 60 * 60, // 14 days
      }),
      cookie: { secure: false },
    })
  );

  const logger = pino({ transport: { target: "pino-pretty" } });
  //@ts-ignore
  app.use(expressPinoLogger({ logger }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    console.log("serializeUser", user);
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    console.log("deserializeUser", user);
    //@ts-ignore
    done(null, user);
  });

  const LocalStrategy = passportlocal.Strategy;

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        console.log(email, password);
        try {
          const user = await User.findOne({ email });
          if (!user || !(await bcrypt.compare(password, user.password))) {
            return done(null, false, { message: "Invalid credentials" });
          }
          if (!user.verified) {
            return done(null, false, { message: "Email is not verified" });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  const upload = multer({ dest: "uploads/" });

  await connectDB();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    formatError: (err) => {
      if (err.message === "Unauthenticated!") {
        return new Error("Authentication required");
      }
      console.error(err);
      return err;
    },
    context: ({ req }) => {
      console.log("authenticating...");
      return { req };
    },
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

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
    if (!req.isAuthenticated()) {
      res.status(401).json({ error: "Please log in" });
      return;
    }
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
  app.get("/verify", async (req, res) => {
    const { token } = req.query;
    try {
      const user = await User.findById(token);
      if (!user) {
        res.status(400).send("Invalid token");
      } else {
        user.verified = true;
        await user.save();
        res.redirect(302, "http://localhost:31000/login");
      }
    } catch (error) {
      res.status(500).send("An error occurred during verification.");
    }
  });
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json({
      user: req.user,
    });
  });
  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.session.destroy((err) => {
        if (err) {
          console.error("Failed to destroy the session during logout", err);
          return next(err);
        }
        res.clearCookie("connect.sid");
        res.send("Logged out successfully");
      });
    });
  });
};

startServer();
