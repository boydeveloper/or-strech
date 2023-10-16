const express = require("express");
const cors = require("cors");
const verifyToken = require("./middleware/verifyToken");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const accountRouter = require("./routes/accountRoutes");
app.use("/api/accounts", accountRouter);

// app.use(verifyToken);

const userRouter = require("./routes/userRoutes");
app.use("/api/users", userRouter);

const tagRouter = require("./routes/tagRoutes");
app.use("/api/tags", tagRouter);

const eventRouter = require("./routes/eventRoutes");
app.use("/api/events", eventRouter);

const linkRouter = require("./routes/linkRoutes");
app.use("/api/links", linkRouter);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
