const Link = require("../models/model").links;

const linksArray = [
  "privacy_policy",
  "faq",
  "in_depth_stretching",
  "seated",
  "standing",
];

const createLink = async (req, res) => {
  try {
    if (!req.body)
      return res
        .status(400)
        .json({ message: "Body not specified", isSuccess: false });
    if (linksArray.includes(req.body.name)) {
      const linkExistsInDb = await Link.findOne({
        where: { name: req.body.name },
      });
      if (linkExistsInDb) {
        const link = await Link.update(req.body, {
          where: { name: req.body.name },
        });
        return res.status(200).json({ link, isSuccess: true });
      } else {
        const link = await Link.create(req.body);
        return res.status(200).json({ link, isSuccess: true });
      }
    } else {
      return res.status(400).json({
        message:
          "Link type does not exist. Link names available are: privacy_policy, faq, in_depth_stretching, seated and standing. Check the possible links endpoint. ",
        isSuccess: false,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err, isSuccess: false });
  }
};

const updateLink = async (req, res) => {
  try {
    const name = req.query.name;
    if (!name)
      return res
        .status(400)
        .json({ message: "Name parameter not specified.", isSuccess: false });
    if (!linksArray.includes(req.query.name))
      return res.status(400).json({
        message:
          "This link type does not exist. Check possible links endpoint for more details.",
        isSuccess: false,
      });
    const link = await Link.findOne({ where: { name } });

    if (link) {
      await Link.update(req.body, { where: { name } });
      return res.status(200).json({ link, isSuccess: true });
    } else {
      return res.status(400).json({
        message: `Link with name ${name} does not exist.`,
        isSuccess: false,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err, isSuccess: false });
  }
};

const deleteLink = async (req, res) => {
  try {
    const name = req.query.name;
    if (!name)
      return res
        .status(400)
        .json({ message: "Name parameter not specified", isSuccess: false });
    const link = await Link.findOne({ where: { name } });
    if (link) {
      await Link.destroy({ where: { name } });
      return res.status(200).json({
        message: `Link with name ${name} has been deleted.`,
        isSuccess: true,
      });
    } else {
      return res.status(400).json({
        message: `Link with name ${name} does not exist.`,
        isSuccess: false,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err, isSuccess: false });
  }
};

const linkDetails = async (req, res) => {
  try {
    const name = req.query.name;
    if (!name)
      return res
        .status(400)
        .json({ message: "Name parameter not specified", isSuccess: false });
    const link = await Link.findOne({ where: { name } });
    if (link) {
      return res.status(200).json({
        link,
        isSuccess: true,
      });
    } else {
      return res.status(400).json({
        message: `Link with name ${name} does not exist.`,
        isSuccess: false,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err, isSuccess: false });
  }
};


const possibleLinks = async (req, res) => {
  return res.status(200).json({ linksArray, isSuccess: true });
};

module.exports = {
  createLink,
  updateLink,
  deleteLink,
  linkDetails,
  possibleLinks,
};
