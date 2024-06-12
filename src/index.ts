import "dotenv/config";
import express from "express";
import { createServer } from "node:http";
import connectDB from "./db";
import initWebsockets from "./websockets/server";
import globalRouter from "./global-router";
import { logger } from "./logger";

connectDB();

const app = express();

app.use(express.json());
app.use(logger);
app.use("/api/v1/", globalRouter);

const server = createServer(app);

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});

initWebsockets(server);
