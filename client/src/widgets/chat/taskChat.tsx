import React, { useEffect, useState, useRef } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { fetchMessages } from '../../entities/chat/model/chatThunk';
import type { RootState } from '@/app/store';
import io from 'socket.io-client';

type ChatWindowProps = {
  chatId: number;
  userId: number;
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const socket = io('http://localhost:3001', {
  withCredentials: true,
});

export const ChatWindow: React.FC<ChatWindowProps> = ({ chatId, userId }) => {

socket.on('connect', () => {
  console.log('Socket connected, id:', socket.id);
});

  const dispatch = useAppDispatch();
  const messages = useAppSelector((state: RootState) => state.chat.messages);
  const [input, setInput] = useState('');
  const [localMessages, setLocalMessages] = useState(messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    void dispatch(fetchMessages(chatId));
    socket.emit('joinChat', chatId);

    return () => {
      socket.emit('leaveChat', chatId); 
      socket.off('newMessage');
    };
  }, [chatId, dispatch]);

  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  useEffect(() => {
    socket.on('newMessage', (msg) => {
      setLocalMessages((prev) => [...prev, msg]);
    });
    return () => {
      socket.off('newMessage');
    };
  }, []);

  // useEffect(() => {
  //   // autoscroll
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [localMessages]);

  const handleSend = (): void => {
    if (input.trim() === '') return;
    socket.emit('sendMessage', { chatId, text: input, senderId: userId });
    setInput('');
  };

  return (
    <Box sx={{ mt: 4, p: 2, background: '#f9fafb', borderRadius: 2 }}>
      <Typography variant="h6" mb={2}>
        Чат
      </Typography>
      <Paper
        variant="outlined"
        sx={{ p: 2, maxHeight: 260, overflowY: 'auto', mb: 2, bgcolor: 'white' }}
      >
        {localMessages.map((msg) => (
          <Box
            key={msg.id}
            sx={{
              mb: 1,
              textAlign: msg.senderId === userId ? 'right' : 'left',
            }}
          >
            <b>{msg.senderId === userId ? 'Вы' : 'Собеседник'}: </b>
            <span>{msg.text}</span>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Paper>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          placeholder="Введите сообщение…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
        />
        <Button variant="contained" onClick={handleSend}>
          Отправить
        </Button>
      </Box>
    </Box>
  );
};
