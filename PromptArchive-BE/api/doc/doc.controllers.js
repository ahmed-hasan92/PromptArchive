const Doc = require("../../models/Doc");
const User = require("../../models/User");
User;
exports.createDocument = async (req, res, next) => {
  try {
    const newDocument = await Doc.create({
      title: req.body.title,
      content: req.body.content,
      user: req.user._id,
    });
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $push: { docs: newDocument._id } }
    );
    res.status(201).json("A new doument has been created");
  } catch (error) {
    next(error);
  }
};

exports.getAllDouments = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const existingDouments = await Doc.find({ user: userId });
    if (!existingDouments || existingDouments.length === 0) {
      return res.status(404).json("There are no available documents");
    }
    res.status(200).json(existingDouments);
  } catch (error) {
    next(error);
  }
};

exports.getOneDoument = async (req, res, next) => {
  try {
    const { documentId } = req.params;

    const existingDoument = await Doc.findById(documentId);
    if (!existingDoument) {
      return res.status(404).json("The document is not found!");
    }
    res.status(200).json(existingDoument);
  } catch (error) {
    next(error);
  }
};

exports.updateDocument = async (req, res, next) => {
  try {
    const { documentId } = req.params;
    const existingDoument = await Doc.findById(documentId);
    if (!existingDoument) {
      return res.status(404).json("The document is not found!");
    }
    if (!existingDoument.user.equals(req.user._id)) {
      return res
        .status(403)
        .json("You don't have the permission to make this action");
    }
    await existingDoument.updateOne({ title: req.body.title });
    res.status(200).json("The document has been updated");
  } catch (error) {
    next(error);
  }
};

exports.deleteDocument = async (req, res, next) => {
  try {
    const { documentId } = req.params;
    const existingDoument = await Doc.findById(documentId);
    if (!existingDoument) {
      return res.status(404).json("The document is not found!");
    }
    if (!existingDoument.user.equals(req.user._id)) {
      res.status(403).json("You don't have the permission to make this action");
    }

    await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $pull: { docs: existingDoument._id } }
    );
    await existingDoument.deleteOne();
    res.status(200).json("The document has been deleted");
  } catch (error) {
    next(error);
  }
};
