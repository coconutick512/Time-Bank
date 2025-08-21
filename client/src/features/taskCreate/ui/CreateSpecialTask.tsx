import React, { useState } from 'react';
import { useAppDispatch } from '@/shared/hooks/hooks';
import { createSpecialTask } from '@/entities/tasks/model/tasksThunk';
import './CreateSpecialTask.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  executorId: number; // Profile owner ID
  creatorId: number; // Current user ID (task creator)
  bookedDate: string;
};

export default function CreateTaskModal({
  isOpen,
  onClose,
  executorId,
  creatorId,
  bookedDate,
}: Props): React.JSX.Element | null {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    void dispatch(
      createSpecialTask({
        title,
        description,
        deadline,
        bookedDate,
        executorId,
        creatorId,
      }),
    ).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        onClose();
        setTitle('');
        setDescription('');
        setDeadline('');
      }
    });
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-window">
        <h2 id="modal-title" className="modal-title">
          Новое задание
        </h2>
        <p className="modal-booked-time">Время: {new Date(bookedDate).toLocaleString()}</p>

        <form onSubmit={handleSubmit} className="modal-form" noValidate>
          <input
            type="text"
            placeholder="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="modal-input"
            required
            aria-required="true"
            aria-label="Название задания"
          />
          <textarea
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="modal-textarea"
            required
            rows={4}
            aria-required="true"
            aria-label="Описание задания"
          />
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="modal-input"
            required
            aria-required="true"
            aria-label="Срок выполнения"
          />

          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="modal-btn-cancel">
              Отмена
            </button>
            <button type="submit" className="modal-btn-submit" disabled={!title || !deadline}>
              Создать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
