require('dotenv').config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.js")
const client = require("./configs/db.js");
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("Server is up and running");
})

client.connect((err) => {
    if (err){
        console.log(err);
    }
    else{
        console.log("connected to database");
    }
})

app.use("/auth", authRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})