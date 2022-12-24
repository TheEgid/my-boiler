import express from "express";
import path from "path";

const app = express();
const PORT = 3006;

app.use(express.static(path.join(__dirname, "build")));
// app.use(cookieParser());

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.all("*", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS, POST");
});

app.listen(PORT);

console.log("React Server is Running on PORT: ", PORT);
