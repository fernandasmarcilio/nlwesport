import express from "express";

const app = express();

app.get('/ads', (req, res) => {
  return res.json({ title: "Hello NLW"});
});

app.listen(3333);