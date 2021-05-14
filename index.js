const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

app.get("/", (req, res) => {
    res.send("Server is up and running");
})