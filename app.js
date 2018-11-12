
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server);
io.on("connection", socket => {
    console.log("New client connected")
    socket.on("disconnect", () => console.log("Client disconnected"));
    socket.on('message', function (msg) {
        console.log(msg)
        io.emit("message", msg);
    });
});
// const getApiAndEmit = async socket => {
//     try {
//         const res = await axios.get(
//             "https://api.darksky.net/forecast/06ebebff0241212a86641c9e81180d92/43.7695,11.2558"
//         );
//         // socket.emit("FromAPI", res.data.currently.temperature);
//         let a = 1
//         setInterval(() => {
//             a += 1
//         }, 1000)
//         socket.emit("FromAPI", a);
//     } catch (error) {
//         console.error(`Error: ${error.code}`);
//     }
// };
server.listen(port, () => console.log(`Listening on port ${port}`));