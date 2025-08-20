import React, { useState } from 'react';
import { useAppDispatch } from '@/shared/hooks/hooks';
import { createSpecialTask } from '@/entities/tasks/model/tasksThunk';

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
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Новое задание</h2>
        <p className="text-sm text-gray-600 mb-4">Время: {new Date(bookedDate).toLocaleString()}</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2"
            required
          />
          <textarea
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded p-2"
            required
          />
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="border rounded p-2"
            required
          />

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Создать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
