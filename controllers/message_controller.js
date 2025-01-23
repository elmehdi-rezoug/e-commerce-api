import MessageModel from "../models/message_model.js";

export async function getMessages(req, res) {
  try {
    const messages = await MessageModel.find().populate("userId");
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error : error.message });
  }
}

export async function getMessageById(req, res) {
  try {
    const message = await MessageModel.findById(req.params.id).populate(
      "userId"
    );
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error : error.message });
  }
}

export async function postMessage(req, res) {
  try {
    const message = await MessageModel.create(req.body);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error : error.message });
  }
}

export async function updateMessage(req, res) {
  try {
    const message = await MessageModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators:true }
    );
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error : error.message });
  }
}

export async function deleteMessage(req, res) {
  try {
    const message = await MessageModel.findByIdAndDelete(req.params.id);
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error : error.message });
  }
}
