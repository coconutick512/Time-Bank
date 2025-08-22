import type { AllMessagesResponse, Chat, MessageResponse } from '@/entities/chat/types/schema';
import { ChatSchema, MessageSchema, MessagesSchema } from '@/entities/chat/types/schema';
import axiosInstance from '@/shared/api/axiosinstance';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ChatService {
  static createChat = async (taskId: number): Promise<Chat> => {
    try {
      const response = await axiosInstance.post('/chats', { taskId });
      const validData = ChatSchema.parse(response.data);
      return validData;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  };

  static fetchChat = async (taskId: number): Promise<Chat> => {
    try {
      const response = await axiosInstance.get(`/chats/${taskId.toString()}`);
      console.log('____+_+_+_+_+_+_+_+_+_', response.data);
      
      // If no chat exists, create one
      if (response.data === null) {
        return await this.createChat(taskId);
      }
      
      const validData = ChatSchema.parse(response.data);
      return validData;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  };

  static fetchMessages = async (chatId: number): Promise<AllMessagesResponse> => {
    try {
      const response = await axiosInstance.get(`/messages/${chatId.toString()}`);
      const validData = MessagesSchema.parse(response.data);
      return validData;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  };

  static createMessage = async (
    chatId: number,
    text: string,
    senderId: number,
  ): Promise<MessageResponse> => {
    try {
      const message = await axiosInstance.post(`/messages`, { chatId, text, senderId });
      const validData = MessageSchema.parse(message.data);
      return validData;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      throw error;
    }
  };
}
