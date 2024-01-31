const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const verifyToken = require("./middleware/verifyToken");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

const accountRouter = require("./routes/account.route");
app.use("/api/accounts", accountRouter);

app.use(verifyToken);
const baselineSurveyRouter = require("./routes/baselinesurvey.route");
app.use("/api/baselinesurvey", baselineSurveyRouter);
const endofdaySurveyRouter = require("./routes/endofdaysurvey.route");
app.use("/api/endofdaysurvey", endofdaySurveyRouter);
const userRouter = require("./routes/user.route");
app.use("/api/users", userRouter);

const eventRouter = require("./routes/event.route");
app.use("/api/events", eventRouter);

const tagRouter = require("./routes/tag.route");
app.use("/api/tags", tagRouter);

const linkRouter = require("./routes/link.route");
app.use("/api/links", linkRouter);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
