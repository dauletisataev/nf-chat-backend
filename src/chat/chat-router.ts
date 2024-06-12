import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import ChatService from "./chat-service";

const chatRouter = Router();

chatRouter.use(authMiddleware);

const chatService = new ChatService();

chatRouter.post("/:id/sendText", async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const { user } = req;
  await chatService.sendTextMessage((user as any).id, id, text);
  res.send("success");
});

export default chatRouter;
