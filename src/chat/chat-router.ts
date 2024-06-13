import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import ChatService from "./chat-service";
import { chatModel } from "./models/chat";
import { messageModel } from "./models/message";
import SocketEventService from "../websockets/events/chatEvents";



const chatRouter = Router();

const chatService = new ChatService();



chatRouter.post("/:id/sendText", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const { user } = req;
  const message = await chatService.sendTextMessage((user as any).id, id, text);
  await SocketEventService.getInstance().fireMessageEvent(id, message);
  res.send("success");
});

chatRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const chat = await chatModel.findById(id);
  const messages = await messageModel.find({ chat: chat?.id });
  res.json({ chat, messages });
});


export default chatRouter;
