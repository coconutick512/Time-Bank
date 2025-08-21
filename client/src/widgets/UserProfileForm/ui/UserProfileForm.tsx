/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { submitAnceta } from '@/entities/user/model/userThunk';
import { fetchAllSkills } from '@/entities/skills/model/skillsThunk';
import './UserProfileForm.css';

const timeZones = [
  'UTC',
  'Europe/Moscow',
  'America/New_York',
  'America/Los_Angeles',
  'Asia/Tokyo',
  'Australia/Sydney',
];

export const UserProfileForm = ({ onClose }: { onClose: () => void }): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const {
    skills,
    status: skillsStatus,
    error: skillsError,
  } = useAppSelector((state) => state.skills);

  const [formData, setFormData] = useState({
    city: '',
    timezone: '',
    teachingCategories: [] as number[],
    avatarFile: null as File | null,
    bio: '',
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    void dispatch(fetchAllSkills());
  }, [dispatch]);

  const handleChange = (field: string, value: string | string[] | number[]): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, avatarFile: e.target.files![0] }));
    }
  };

  const handleSkillToggle = (skillId: number): void => {
    setFormData((prev) => {
      const currentSkills = prev.teachingCategories;
      if (currentSkills.includes(skillId)) {
        return {
          ...prev,
          teachingCategories: currentSkills.filter((id) => id !== skillId),
        };
      }
      return {
        ...prev,
        teachingCategories: [...currentSkills, skillId],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setUploading(true);

    const submitData = new FormData();
    submitData.append('city', formData.city);
    submitData.append('time', formData.timezone);
    submitData.append('about', formData.bio);
    submitData.append('skills', JSON.stringify(formData.teachingCategories));

    if (formData.avatarFile) {
      submitData.append('avatar', formData.avatarFile);
    }

    try {
      await dispatch(submitAnceta(submitData)).unwrap();
    } catch (err) {
      console.error('Error saving profile:', err);
    } finally {
      setUploading(false);
    }
    onClose();
  };

  const skillsLoading = skillsStatus === 'loading';
  const hasSkillsError = skillsStatus === 'reject';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Заполните профиль</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="city">Город</label>
            <input
              id="city"
              type="text"
              placeholder="Введите ваш город"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="timezone">Часовой пояс</label>
            <select
              id="timezone"
              value={formData.timezone}
              onChange={(e) => handleChange('timezone', e.target.value)}
              className="form-select"
            >
              <option value="" disabled>
                Выберите часовой пояс
              </option>
              {timeZones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="avatar" className="file-label">
              <span className="file-label-text">Загрузить аватар</span>
              <input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
                className="file-input"
              />
              <div className="file-preview">
                {uploading ? (
                  <span className="file-status">Загружается...</span>
                ) : formData.avatarFile ? (
                  <span className="file-status success">
                    ✓ Файл выбран: {formData.avatarFile.name}
                  </span>
                ) : (
                  <span className="file-placeholder">Выберите файл</span>
                )}
              </div>
            </label>
          </div>

          <div className="form-group">
            <label className="skills-label">Навыки, которые могу преподать:</label>
            {skillsLoading ? (
              <div className="skills-loading">Загрузка навыков...</div>
            ) : hasSkillsError ? (
              <div className="skills-error">Ошибка: {skillsError}</div>
            ) : (
              <div className="skills-grid">
                {skills.map((skill) => (
                  <label key={skill.id} className="skill-checkbox">
                    <input
                      type="checkbox"
                      checked={formData.teachingCategories.includes(skill.id)}
                      onChange={() => handleSkillToggle(skill.id)}
                      className="skill-input"
                    />
                    <span className="skill-text">{skill.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="bio">О себе</label>
            <textarea
              id="bio"
              placeholder="Расскажите о себе, своих компетенциях и опыте..."
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              className="form-textarea"
              rows={4}
            />
          </div>

          <button type="submit" disabled={uploading} className="submit-button">
            {uploading ? 'Загрузка...' : 'Сохранить анкету'}
          </button>
        </form>
      </div>
    </div>
  );
};
