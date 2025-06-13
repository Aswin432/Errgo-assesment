import express from "express";
import cors from "cors";
import http from "http";
import { handleWebSocketUpgrade } from "./websocket";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const server = http.createServer(app);

server.on("upgrade", handleWebSocketUpgrade);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
