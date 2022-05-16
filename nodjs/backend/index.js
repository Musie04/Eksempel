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
  host: "localhost",
  user: "root",
  password: "Qwerty",
  database: "registring",
});

app.get("/", (req, res) => res.send("Hello 2it!"));

app.post("/createUser", (req, res) => {
  console.log("A person <has sende a requs to/createUser ");
  console.log(req.body);
  const testObject = {
    Navn: req.body.Navn,
    Etternavn: req.body.Etternavn,
    Fødselsdato: req.body.Fødselsdato,
    telefon: req.body.telefon,
    Adresse: req.body.Adresse,
    Postnummer: req.body.Postnummer,
  };

  const insertQuery =
    "INSERT INTO registringsjema (Navn,Etternavn,Fødselsdato,telefon,Adresse,Postnummer) VALUES(?,?,?,?,?,?)";

  con.query(
    insertQuery,
    [
      testObject.Navn,
      testObject.Etternavn,
      testObject.Fødselsdato,
      testObject.telefon,
      testObject.Adresse,
      testObject.Postnummer,
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
  const sqlQuery = "SELECT * FROM registringsjema";

  con.query(sqlQuery, (err, rows) => {
    if (err) console.log(err);
    res.json(rows);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
