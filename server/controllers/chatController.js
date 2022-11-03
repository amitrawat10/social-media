import ChatModel from "../models/chatModel.js";

export const createChat = async (req, res) => {
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const result = await newChat.save();
    return res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

export const userChats = async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(401).json("no payload");
  try {
    const chat = await ChatModel.find({
      members: { $in: [userId] },
    });
    return res.status(200).json(chat);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

export const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;
  if (!firstId || !secondId) return res.status(401).json("user id not found");
  try {
    const chat = await ChatModel.find({
      members: { $all: [firstId, secondId] },
    });
    return res.status(200).json(chat);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};
