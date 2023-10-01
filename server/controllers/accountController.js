const db = require("../models/model");
const crypto = require("crypto");
const Account = db.accounts;
const User = db.users;

const loginAccount = async (req, res) => {
  try {
    const randomBytes = crypto.randomBytes(128);
    const sessionId = randomBytes.toString("hex");
    let info = {
      email: req.body.email,
    };
    const account = await Account.findOne({
      where: { email: req.body.email },
    });
    if (account) {
      return res.status(200).json({
        account: {
          id: account.id,
          email: account.email,
          createdAt: account.createdAt,
          isNew: true,
          sessionId,
        },
        isSuccess: true,
      });
    } else {
      const account = await Account.create(info);
      const user = await User.create({
        email: req.body.email,
        password: "defaultpassword",
        salt: "defaultsalt",
        conf_timer: 45,
        active: 1,
        frequency: 1,
        surveys_number: 10,
        days_number: 5,
        deleted: 0,
        baseline_survey: 0,
        main_user_id: account.id,
      });
      await User.update(
        { main_user_id: user.id },
        { where: { email: req.body.email } }
      );
      return res.status(200).json({
        account: {
          id: account.id,
          email: account.email,
          createdAt: account.createdAt,
          isNew: true,
          sessionId,
        },
        isSuccess: true,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err, isSuccess: false });
  }
};

module.exports = {
  loginAccount,
};
