import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import dotenv from "dotenv";
import express from 'express';
import http from "http";
import mergedResolvers from "./resolver/index.js";
import mergedTypeDefs from "./typeDefs/index.js";
import connectToMongo from "./db/database.js";

dotenv.config({})

connectToMongo();
const app = express();
const port = process.env.PORT || 4000;
const httpServer = http.createServer(app);

const server = new ApolloServer({
	typeDefs: mergedTypeDefs,
	resolvers: mergedResolvers,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
	'/',
	cors(),
	express.json(),
	expressMiddleware(server, {
	  context: async ({ req }) => ({ req }),
	}),
  );

  await new Promise((resolve) => httpServer.listen({ port }, resolve));

console.log(`server is running on ${port}`);