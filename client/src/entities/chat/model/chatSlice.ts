import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Chat, AllMessagesResponse } from '@/entities/chat/types/schema';
import { createChat, fetchChat, fetchMessages, createMessage } from './chatThunk';

type ChatState = {
  status: 'loading' | 'done' | 'reject';
  chat: Chat | null;
  messages: AllMessagesResponse;
  error: string | undefined;
};

const initialState: ChatState = {
  status: 'loading',
  chat: null,
  messages: [],
  error: undefined,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createChat.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createChat.fulfilled, (state, action) => {
      state.chat = action.payload;
      state.status = 'done';
    });
    builder.addCase(createChat.rejected, (state, action) => {
      state.status = 'reject';
      state.error = action.error.message;
    });
    builder.addCase(fetchChat.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchChat.fulfilled, (state, action) => {
      state.chat = action.payload;
      state.status = 'done';
    });
    builder.addCase(fetchChat.rejected, (state, action) => {
      state.error = action.error.message;
      state.status = 'reject';
    });
    builder.addCase(fetchMessages.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
      state.status = 'done';
    });
    builder.addCase(fetchMessages.rejected, (state, action) => {
      state.error = action.error.message;
      state.status = 'reject';
    });
    builder.addCase(createMessage.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createMessage.fulfilled, (state, action) => {
      state.messages.push(action.payload);
      state.status = 'done';
    });
    builder.addCase(createMessage.rejected, (state, action) => {
      state.error = action.error.message;
      state.status = 'reject';
    });
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;
