const express = require("express");
const app = express();

const port = process.env.PORT || 3835;

// middleware
app.use(express.json());

// Data and utilities ------------------------------------------------------------------------------
let brackets = [
  { id: 1, name: "Dom", winner: "Gonzaga" },
  { id: 2, name: "Jonnie", winner: "UVA" }
];

const ERROR = {
  notFound: "The bracket with the given ID was not found. 👀",
  noWinner: "Picking a winner is required."
};

function findBracketById(id) {
  const bracket = brackets.find(b => b.id === parseInt(id));
  if (!bracket) return;
  return bracket;
}

// GET landing message -----------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.send("🤠 Dommy\n🤠 Jonny Boy\n🤠 Productions");
});

// GET brackets ------------------------------------------------------------------------------------
app.get("/api/brackets", (req, res) => res.send(brackets));

// GET brackets by id ------------------------------------------------------------------------------
app.get("/api/brackets/:id", (req, res) => {
  const bracket = findBracketById(req.params.id);

  if (!bracket) return res.status(404).send(ERROR["notFound"]);

  res.send(bracket);
});

// POST bracket  -----------------------------------------------------------------------------------
app.post("/api/brackets", (req, res) => {
  if (!req.body.winner) return res.status(400).send(ERROR["noWinner"]);

  const bracket = {
    id: brackets.length + 1, // gross
    name: req.body.name,
    winner: req.body.winner
  };

  brackets.push(bracket);
  res.send(bracket);
});

// PUT bracket -------------------------------------------------------------------------------------
app.put("/api/brackets/:id", (req, res) => {
  const bracket = findBracketById(req.params.id);

  if (!bracket) return res.status(404).send(ERROR["notFound"]);
  if (!req.body.winner) return res.status(400).send(ERROR["noWinner"]);

  bracket.winner = req.body.winner;
  bracket.name = req.body.name;
  res.send(bracket);
});

// DELETE bracket ----------------------------------------------------------------------------------
app.delete("/api/brackets/:id", (req, res) => {
  const bracket = findBracketById(req.params.id);

  if (!bracket) return res.status(404).send(ERROR["notFound"]);

  const index = brackets.indexOf(bracket);
  brackets.splice(index, 1);
  res.send(bracket);
});

// Listen on port... -------------------------------------------------------------------------------
app.listen(port, () => console.log(`Listening on port: ${port}`));
