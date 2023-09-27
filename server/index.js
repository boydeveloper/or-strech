const express = require("express");
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Helo from API" });
});

//routers
const accountRouter = require("./routes/accountRoutes");
app.use("/api/accounts", accountRouter);
//routers
const userRouter = require("./routes/userRoutes");
app.use("/api/users", userRouter);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
