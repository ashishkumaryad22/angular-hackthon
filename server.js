var app = require("express")();
var http = require("http").createServer(app);
const PORT = 5000;
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  },
});

const cors = require("cors");
app.use(cors());

// const io = require("socket.io")(http);
app.get("/", (req, res) => {
  res.send("hello Chat App Server !!");
});

io.on("connection", (socket) => {
  console.log("a user is connected");
  socket.on("message", (msg) => {
    console.log("msg", msg);
    socket.broadcast.emit("message-broadcast", msg);
  });
});

http.listen(PORT, () => {
  console.log(`Listening on port:  http://127.0.0.1:${PORT}
  `);
});
