const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/public", express.static("public"));
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "loginnodejs"
});

connection.connect((error) => {
    (error) ? console.log("Error connecting to database!")
        : console.log("Successfully connected to database!");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});

app.post("/", encoder, (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    var sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
    connection.query(sql, [username, password], (error, results, fields) => {
        if (error) throw error;
    });
    res.end();
});