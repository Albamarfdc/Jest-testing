import express from "express";
import { v4 } from "uuid";

const app = express();
app.use(express.json());

app.get("/hola", (req, res) => {
  res.send({ message: "Hola mundo" });
});

app.get("/tasks", (req, res) => {
  res.json([]);
});

app.post("/tasks", (req, res) => {
  const { title, description } = req.body;
  !title || !description
    ? res.sendStatus(400)
    : res.json({
        title,
        description,
        id: v4(),
      });
});
export default app;
