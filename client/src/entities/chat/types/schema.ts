import { z } from 'zod';

export const ChatSchema = z.object({
  id: z.number(),
  taskId: z.number(),
});

export const MessageSchema = z.object({
  id: z.number(),
  chatId: z.number(),
  senderId: z.number(),
  text: z.string(),
});

export const MessagesSchema = z.array(MessageSchema);

export const AllMessagesResponseSchema = z.array(MessageSchema);

export const ChatResponseSchema = ChatSchema;

export const MessageResponseSchema = MessageSchema;

export const ChatsStateSchema = z.object({
  status: z.enum(['loading', 'done', 'reject']),
  chats: z.array(ChatSchema),
  error: z.string().nullable(),
});

export const MessagesStateSchema = z.object({
  status: z.enum(['loading', 'done', 'reject']),
  messages: z.array(MessageSchema),
  error: z.string().nullable(),
});

export type MessagesState = z.infer<typeof MessagesStateSchema>;
export type Messages = z.infer<typeof MessagesSchema>;
export type Message = z.infer<typeof MessageSchema>;
export type AllMessagesResponse = z.infer<typeof AllMessagesResponseSchema>;
export type MessageResponse = z.infer<typeof MessageResponseSchema>;

export type Chat = z.infer<typeof ChatSchema>;
export type ChatResponse = z.infer<typeof ChatResponseSchema>;
export type ChatState = z.infer<typeof ChatSchema>;
export type ChatsState = z.infer<typeof ChatsStateSchema>;
