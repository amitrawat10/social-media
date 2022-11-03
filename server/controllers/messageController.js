import MessageModel from "../models/messageModel.js";
export const addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  if (!chatId || !senderId || !text)
    return res.status(401).json("incomplete payload");
  const msg = new MessageModel({
    chatId,
    senderId,
    text,
  });
  try {
    const result = await msg.save();
    return res.status(200).json(result);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

export const getMessages = async (req, res) => {
  const { chatId } = req.params;
  if (!chatId) return req.status(401).json("incomplete payload");
  try {
    const result = await MessageModel.find({ chatId });
    return res.status(200).json(result);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};
