const Link = require("../models/model").links;

const linksArray = [
  "privacy_policy",
  "faq",
  "in_depth_stretching",
  "seated",
  "standing",
];

const listAllLinks = async (req, res) => {
  try {
    const allLinks = await Link.findAll();

    if (allLinks.length === 0) {
      return res.status(200).json({
        message: "No links found in the database.",
        isSuccess: true,
        links: [],
      });
    }

    return res.status(200).json({
      message: "List of all links retrieved successfully.",
      isSuccess: true,
      links: allLinks,
    });
  } catch (err) {
    return res.status(500).json({ message: err, isSuccess: false });
  }
};

const createLink = async (req, res) => {
  try {
    if (!req.body)
      return res
        .status(400)
        .json({ message: "Body not specified", isSuccess: false });

    if (Number(req.body.media_type) > 2 || Number(req.body.media_type) < 1)
      return res.status(400).json({
        message: "Media type should either be 1 or 2.",
        isSuccess: false,
      });
    const link = await Link.create({
      name: req.body.name,
      url: req.body.url,
      type: Number(req.body.media_type) === 1 ? "video" : "link",
    });
    return res.status(200).json({ link, isSuccess: true });
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
  listAllLinks,
};
