import React, { useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { updateProfile } from '@/entities/user/model/userThunk';
import type { User } from '@/entities/user/types/schema';
import type { Skill } from '@/entities/skills/types/schema';

type Props = {
  user: User;
  skills: Skill[];
  onCancel: () => void;
  onSuccess: () => void;
};

export default function ProfileEditForm({
  user,
  skills,
  onCancel,
  onSuccess,
}: Props): React.JSX.Element {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: user.name || '',
    city: user.city ?? '',
    timezone: user.timezone ?? '',
    about: user.about ?? '',
    availableDates: user.availableDates ?? [],
  });
  const [selectedSkills, setSelectedSkills] = useState<number[]>(
    skills?.map((skill) => skill.id) || [],
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    user.avatar ? `http://localhost:3000/api/uploads/avatars/${user.avatar}` : null,
  );
  const currentUser = useAppSelector((state) => state.user.user);
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('city', formData.city || '');
      formDataToSend.append('timezone', formData.timezone || '');
      formDataToSend.append('about', formData.about || '');
      formDataToSend.append('availableDates', JSON.stringify(formData.availableDates || []));
      formDataToSend.append('skillIds', JSON.stringify(selectedSkills || []));

      if (selectedFile) {
        formDataToSend.append('avatar', selectedFile);
      }

      // Debug: log what we're sending
      console.log('Sending skillIds:', selectedSkills);
      console.log('Sending skillIds JSON:', JSON.stringify(selectedSkills || []));

      await dispatch(updateProfile(formDataToSend)).unwrap();

      onSuccess();
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = (): void => {
    fileInputRef.current?.click();
  };

  const handleRemoveAvatar = (): void => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDateChange = (date: Date, isSelected: boolean): void => {
    const dateStr = date.toISOString();
    setFormData((prev) => ({
      ...prev,
      availableDates: isSelected
        ? [...prev.availableDates, dateStr]
        : prev.availableDates.filter((d) => d !== dateStr),
    }));
  };

  const handleSkillToggle = (skillId: number): void => {
    setSelectedSkills((prev) =>
      prev.includes(skillId) ? prev.filter((id) => id !== skillId) : [...prev, skillId],
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Редактировать профиль</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Avatar */}
        <div>
          <label className="block text-sm font-medium mb-2">Фото профиля</label>
          <div className="flex items-center space-x-4">
            <div
              className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 cursor-pointer border-2 border-gray-300 hover:border-blue-500 transition-colors"
              onClick={handleAvatarClick}
            >
              {previewUrl ? (
                <img src={previewUrl} alt="Avatar preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <button
                type="button"
                onClick={handleAvatarClick}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Выбрать фото
              </button>
              {previewUrl && (
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Удалить
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Поддерживаемые форматы: JPG, PNG, GIF. Максимальный размер: 5MB
          </p>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Имя</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            className="w-full border rounded-md px-3 py-2"
            required
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium mb-1">Город</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        {/* Timezone */}
        <div>
          <label className="block text-sm font-medium mb-1">Часовой пояс</label>
          <select
            value={formData.timezone}
            onChange={(e) => setFormData((prev) => ({ ...prev, timezone: e.target.value }))}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="">Выберите часовой пояс</option>
            <option value="UTC+3">UTC+3 (Москва)</option>
            <option value="UTC+4">UTC+4 (Самара)</option>
            <option value="UTC+5">UTC+5 (Екатеринбург)</option>
            <option value="UTC+7">UTC+7 (Новосибирск)</option>
            <option value="UTC+10">UTC+10 (Владивосток)</option>
          </select>
        </div>

        {/* About */}
        <div>
          <label className="block text-sm font-medium mb-1">О себе</label>
          <textarea
            value={formData.about}
            onChange={(e) => setFormData((prev) => ({ ...prev, about: e.target.value }))}
            rows={4}
            className="w-full border rounded-md px-3 py-2"
            placeholder="Расскажите о себе..."
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium mb-1">Навыки</label>
          <div className="grid grid-cols-2 gap-2">
            {skills.map((skill) => (
              <label key={skill.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedSkills.includes(skill.id)}
                  onChange={() => handleSkillToggle(skill.id)}
                  className="rounded"
                />
                <span>{skill.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Available Dates */}
        <div>
          <label className="block text-sm font-medium mb-1">Доступные даты</label>
          <div className="text-sm text-gray-600 mb-2">
            Выберите даты, когда вы доступны для выполнения задач
          </div>
          <input
            type="date"
            onChange={(e) => {
              const date = new Date(e.target.value);
              handleDateChange(date, true);
            }}
            className="border rounded-md px-3 py-2"
          />
          <div className="mt-2">
            <div className="text-sm font-medium mb-1">Выбранные даты:</div>
            <div className="flex flex-wrap gap-1">
              {formData.availableDates.map((dateStr, index) => (
                <span
                  key={`date-${dateStr}`}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                >
                  {new Date(dateStr).toLocaleDateString()}
                  <button
                    type="button"
                    onClick={() => handleDateChange(new Date(dateStr), false)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Отмена
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </form>
    </div>
  );
}
