const db = require("../models");
const Tag = db.tags;

const createTag = async (req, res) => {
  try {
    let info = {
      name: req.body.name,
      baseline: req.body.baseline_survey,
    };
    if (!info.name)
      return res.status(400).json({ message: "Name parameter not specified." });
    if (!info.baseline)
      return res
        .status(400)
        .json({ message: "Baseline survey parameter not specified." });
    const tagExists = await Tag.findOne({ where: { name: req.body.name } });
    if (tagExists) {
      return res.status(400).json({
        message: `Tag with name ${req.body.name} already exists. Please create a new tag.`,
      });
    } else {
      const tag = await Tag.create(info);
      return res.status(200).json({ tag });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const listAllTags = async (req, res) => {
  try {
    const totalNoOfTags = await Tag.count();
    const tags = await Tag.findAll({
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json({ tags, totalNoOfTags });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const listTags = async (req, res) => {
  const page_no = Number(req.query.page_no);
  const no_of_tags = Number(req.query.no_of_tags);
  const offset = (page_no - 1) * no_of_tags;
  const totalNoOfTags = await Tag.count();

  if (isNaN(page_no) || page_no <= 0) {
    return res.status(400).json({
      message:
        "Invalid page number parameter. It should be a number and shouldn't be less than one.",
    });
  }
  const tags = await Tag.findAll({
    offset,
    limit: no_of_tags,
    order: [["createdAt", "DESC"]],
  });
  return res.status(200).json({ tags, totalNoOfTags });
};

const deleteTag = async (req, res) => {
  try {
    const name = req.query.name;
    if (!name)
      return res
        .status(400)
        .json({ message: "Name parameter not specified. " });

    const tag = await Tag.findOne({ where: { name } });
    if (tag) {
      await Tag.destroy({ where: { name } }).then(() => {
        return res
          .status(200)
          .json({ message: `Tag with name '${name}' has been deleted.` });
      });
    } else {
      return res
        .status(400)
        .json({ message: `Tag with name '${name}' does not exist.` });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateTag = async (req, res) => {
  try {
    if (
      req.body.baseline_survey &&
      (req.body.baseline_survey > 1 || req.body.baseline_survey < 0)
    )
      return res
        .status(400)
        .json({ message: "Baseline survey value should either be 0 or 1" });
    const tag = await Tag.findOne({ where: { name: req.query.name } });
    if (tag) {
      await Tag.update(req.body, { where: { name: req.query.name } });
      return res.status(200).json({ message: `Tag has been updated. ` });
    } else {
      return res
        .status(400)
        .json({ message: `Tag with name ${req.query.name} does not exist.` });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const viewTagDetails = async (req, res) => {
  try {
    const name = req.query.name;
    if (!name)
      return res
        .status(400)
        .json({ message: "Name parameter not specified. " });
    const tag = await Tag.findOne({ where: { name } });
    if (tag) {
      return res.status(200).json({ tag });
    } else {
      return res.status(400).json({ message: "Tag not found." });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createTag,
  listTags,
  listAllTags,
  deleteTag,
  updateTag,
  viewTagDetails,
};
