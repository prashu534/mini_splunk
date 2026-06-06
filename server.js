const express = require("express");

const http = require("http");

const { Server } = require("socket.io");

const mysql = require("mysql2");

const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {

  cors: {

    origin: "*"

  }

});

const db = mysql.createConnection({

  host: "localhost",

  user: "root",

  password: "",

  database: "mini_splunk"

});

io.on("connection", (socket) => {

  console.log("Client Connected");

  const sendLogs = () => {

    db.query(

      "SELECT * FROM logs ORDER BY id DESC",

      (err, results) => {

        if (!err) {

          socket.emit("logs", results);

        }

      }

    );

  };

  sendLogs();

  const interval = setInterval(() => {

    sendLogs();

  }, 2000);

  socket.on("disconnect", () => {

    console.log("Client Disconnected");

    clearInterval(interval);

  });

});

server.listen(5000, () => {

  console.log("WebSocket Server Running");

});