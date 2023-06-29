const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
const voteRouter = require("./routes/vote");
const app = express();
const port = 3010;

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/vote", voteRouter);

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(port, () => {
  console.log(`Server listening on port : ${port} 🦉`);
});
