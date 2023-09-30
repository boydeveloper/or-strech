const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const accountRouter = require("./routes/accountRoutes");
app.use("/api/accounts", accountRouter);

const userRouter = require("./routes/userRoutes");
app.use("/api/users", userRouter);

const tagRouter = require("./routes/tagRoutes");
app.use("/api/tags", tagRouter);

const eventRouter = require("./routes/eventRoutes");
app.use("/api/events", eventRouter);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
