const express = require('express');
const app = express();
require("express-ws")(app);
const prisma = require('./prismaClient');

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('info', (req, res) => {
    res.json({ msg: "Yaycha API" });
})

const { wsRouter } = require("./routers/ws");
app.use("/", wsRouter);

const { userRouter } = require("./routers/user");
app.use("/", userRouter);

const { contentRouter } = require("./routers/content");
app.use("/content", contentRouter);

const server = app.listen(4000, () => {
    console.log("Yaycha API started at 4000...");
});

const gracefulShutdown = async () => {
    await prisma.$disconnect();
    server.close(() => {
        console.log("Yaycha API closed.");
        process.exit(0);
    });
}

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);