import { messageModel } from "./models/message";
import { chatModel } from "./models/chat";

class ChatService {
  async sendTextMessage(from: string, conversationID: string, text: string) {
    const message = await messageModel.create({
      chat: conversationID,
      sender: from,
      text: text,
      isRead: false,
    });

    await chatModel.findByIdAndUpdate(conversationID, {
      lastMessage: message._id,
    });

    return message;
  }

  
}

export default ChatService;
