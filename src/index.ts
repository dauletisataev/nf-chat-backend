import "dotenv/config";
import express from "express";
import { createServer } from "node:http";
import connectDB from "./db";
import initWebsockets from "./websockets/server";

connectDB();

const app = express();
const server = createServer(app);

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});

initWebsockets(server);
