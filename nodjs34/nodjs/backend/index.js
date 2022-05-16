//console.log("hello world");
var mysql = require("mysql2");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var con = mysql.createPool({
  host: "sql447.main-hosting.eu",
  user: "u145594474_felles",
  password: "Qwerty12345@3",
  database: "u145594474_Node_felles",
});

app.get("/", (req, res) => res.send("Hello 2it!"));

app.post("/createUser", (req, res) => {
  console.log("A person has sende a requs to/createUser ");
  console.log(req.body);
  const testObject = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    birthdate: req.body.birthdate,
    username: req.body.username,
    password: req.body.password,
  };

  const insertQuery =
    "INSERT INTO users (first_name,Last_name,birthdate,username,password) VALUES(?,?,?,?,?)";

  con.query(
    insertQuery,
    [
      testObject.first_name,
      testObject.last_name,
      testObject.birthdate,
      testObject.username,
      testObject.password,
    ],
    (err, rows) => {
      if (err) {
        res.status(500).json({ msg: "noob, no user made" });
        throw err;
      }
      res.json({ msg: "succesex" });
    }
  );
});

app.get("/displayUsers", (req, res) => {
  console.log("A person has sende a requs to /displayUsers");
  const sqlQuery = "SELECT * FROM users";

  con.query(sqlQuery, (err, rows) => {
    if (err) console.log(err);
    res.json(rows);
  });
});

app.post("/checklogin", (req, res) => {
  console.log("A person has sende a requs to /checklogin");
  //   res.send("this is a response from the server for /checklogin");

  const checkloginQuery =
    "SELECT * FROM users WHERE username = ? AND password = ? ORDER BY id DESC";
  con.query(
    checkloginQuery,
    [req.body.username, req.body.password],
    (err, rows) => {
      if (err) {
        res.status(500).json({ msg: "bad boy server ded" });
        throw err;
      }
      if (rows.length === 0)
        return res.status(403).json({ msg: "username or password is wong" });
      res.json(rows);
    }
  );
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
