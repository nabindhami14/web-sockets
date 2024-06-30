import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  connectionStateRecovery: {},
  cors: {
    origin: "http://localhost:5173",
  },
});

// open the database file
const db = await open({
  filename: "chat.db",
  driver: sqlite3.Database,
});

// create our 'messages' table (you can ignore the 'client_offset' column for now)
await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50),
        client_offset TEXT UNIQUE,
        content TEXT
    );
  `);

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
  socket.on("chat message", async ({ name, message }) => {
    await db.run(
      "INSERT INTO messages (name,content) VALUES (?,?)",
      name,
      message
    );

    io.emit("message", { name, message });
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

httpServer.listen(4000);
