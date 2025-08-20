import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChatService } from '@/entities/chat/api/chatServices';
import type { MessageResponse } from '../types/schema';

export const createChat = createAsyncThunk('chat/createChat', async (taskId: number) => {
  const chat = await ChatService.createChat(taskId);
  return chat;
});
export const fetchChat = createAsyncThunk('chat/fetchChat', async (taskId: number) => {
  const chat = await ChatService.fetchChat(taskId);
  return chat;
});

export const fetchMessages = createAsyncThunk('chat/fetchMessages', async (chatId: number) => {
  const messages = await ChatService.fetchMessages(chatId);
  return messages;
});
export const createMessage = createAsyncThunk(
  'chat/createMessage',
  async ({ chatId, text, senderId }: MessageResponse) => {
    const message = await ChatService.createMessage(chatId, text, senderId);
    return message;
  },
);
