import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { fetchMessages } from '../../entities/chat/model/chatThunk';
import type { RootState } from '@/app/store';
import io from 'socket.io-client';
import './taskChat.css';

type ChatWindowProps = {
  chatId: number;
  userId: number;
};

// Один экземпляр сокета вне компонента
const socket = io('http://localhost:3001', {
  withCredentials: true,
});

export const ChatWindow: React.FC<ChatWindowProps> = ({ chatId, userId }) => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state: RootState) => state.chat.messages);
  const [input, setInput] = useState('');
  const [localMessages, setLocalMessages] = useState(messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  socket.on('connect', () => {
    console.log('Socket connected, id:', socket.id);
  });

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

  // Автоскролл можно снять комментарий при необходимости
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [localMessages]);

  const handleSend = (): void => {
    if (input.trim() === '') return;
    socket.emit('sendMessage', { chatId, text: input, senderId: userId });
    setInput('');
  };

  return (
    <div className="taskchat-root">
      <h2 className="taskchat-title">Чат</h2>
      <div className="taskchat-messages">
        {localMessages.map((msg) => (
          <div
            key={msg.id}
            className={`taskchat-message ${msg.senderId === userId ? 'self' : 'other'}`}
          >
            <b>{msg.senderId === userId ? 'Вы' : 'Собеседник'}: </b>
            <span>{msg.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="taskchat-input-container">
        <input
          type="text"
          placeholder="Введите сообщение…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
          className="taskchat-input"
        />
        <button type="button" onClick={handleSend} className="taskchat-send-button">
          Отправить
        </button>
      </div>
    </div>
  );
};
