const express = require("express");
const app = express();

const brackets = [
  { id: 1, name: "Dom", winner: "Gonzaga" },
  { id: 2, name: "Jonnie", winner: "UVA" }
];

app.get("/", (req, res) => {
  res.send("🤠 Dommy\n🤠 Jonny Boy\n🤠 Productions");
});

app.get("/api/brackets", (req, res) => {
  res.send(brackets);
});

app.get("/api/brackets/:id", (req, res) => {
  const bracket = brackets.find(b => b.id === parseInt(req.params.id));

  if (!bracket) {
    res.status(404).send("The bracket with the given ID was not found. 👀");
  }

  res.send(bracket);
});

app.post("/api/brackets", (req, res) => {});

const port = process.env.PORT || 3835;
app.listen(port, () => console.log(`Listening on port: ${port}`));
