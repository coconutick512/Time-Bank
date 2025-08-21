import React, { useState, useEffect } from 'react';
import type { TaskUpdate } from '@/entities/tasks/types/schema';
import { useNavigate } from 'react-router-dom';
import './EditTaskModal.css';
import { useAppSelector } from '@/shared/hooks/hooks';

type EditTaskModalProps = {
  id: number;
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onSave: (updatedTask: TaskUpdate) => void;
};

export const EditTaskModal: React.FC<EditTaskModalProps> = ({
  open,
  onClose,
  id: initialId,
  title: initialTitle,
  description: initialDescription,
  onSave,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [id, setId] = useState(initialId);
  const { user } = useAppSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setTitle(initialTitle);
      setDescription(initialDescription);
      setId(initialId);
    }
  }, [open, initialId, initialTitle, initialDescription]);

  const handleSave = (): void => {
    onSave({
      id,
      title,
      description,
      status: 'open',
    });
    onClose();
    navigate(`/orders`);
  };

  if (!open) return null;

  return (
    <div
      className="edit-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-task-modal-title"
      onClick={onClose}
    >
      <div className="edit-modal-box" onClick={(e) => e.stopPropagation()}>
        <h2 id="edit-task-modal-title" className="edit-modal-title">
          Редактировать задание
        </h2>

        <form
          className="edit-modal-stack"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          noValidate
        >
          <label className="edit-modal-label" htmlFor="title-input">
            Заголовок
          </label>
          <input
            id="title-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="edit-modal-textfield"
            required
          />

          <label className="edit-modal-label" htmlFor="description-input">
            Описание
          </label>
          <textarea
            id="description-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="edit-modal-textfield"
            rows={4}
            required
          />

          <div className="edit-modal-btn-group">
            <button type="button" className="edit-modal-btn-cancel" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="edit-modal-btn-save">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
