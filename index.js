import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import connectMongo from "connect-mongodb-session";
import cors from 'cors';
import dotenv from "dotenv";
import express from 'express';
import session from "express-session";
import http from "http";
import passport from "passport";
import { connectToMongo as connectToDB } from "./db/database.js";
import { configurePassport } from "./passport/passport.js";
import mergedResolvers from "./resolver/index.js";
import mergedTypeDefs from "./typeDefs/index.js";

dotenv.config({});
configurePassport();

connectToDB();
const app = express();
const port = process.env.PORT || 4000;
const httpServer = http.createServer(app);
const MonogoDBStore = connectMongo(session);

const store = new MonogoDBStore({
	uri: process.env.Mongo_URI,
	collection: "session",
});

store.on("error", (err) => console.log(err));

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false, // this option is wether we can save this session or not
		saveUninitialized: false,
		cookie:{
			maxAge:1000*60*60*24*7,
			httpOnly:true
		},
		store:store
	})
);

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
	typeDefs: mergedTypeDefs,
	resolvers: mergedResolvers,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
	'/',
	cors({
		origin:"http://localhost:5173",
		credentials:true
	}),
	express.json(),
	expressMiddleware(server, {
		context: async ({ req, res }) => ({ req, res }),
	}),
);

await new Promise((resolve) => httpServer.listen({ port }, resolve));

console.log(`server is running on ${port}`);