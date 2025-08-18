import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { submitAnceta } from '@/entities/user/model/userThunk';
import { fetchAllSkills } from '@/entities/skills/model/skillsThunk';

// Sample time zones
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

  const handleChange = (field: string, value: string | string[]): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, avatarFile: e.target.files![0] }));
    }
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
      onClose();
    } catch (err) {
      console.error('Error saving profile:', err);
    } finally {
      setUploading(false);
    }
  };

  const skillsLoading = skillsStatus === 'loading';
  const hasSkillsError = skillsStatus === 'reject';

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          maxWidth: '600px',
          width: '90%',
          maxHeight: '90vh',
          overflow: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <h2>Заполните профиль</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.5rem',
            }}
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <input
            type="text"
            placeholder="Город"
            value={formData.city}
            onChange={(e) => handleChange('city', e.target.value)}
            style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
          />

          <select
            value={formData.timezone}
            onChange={(e) => handleChange('timezone', e.target.value)}
            style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
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

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Загрузить аватар:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
              style={{
                padding: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                width: '100%',
              }}
            />
            {uploading && <span style={{ color: '#666', fontSize: '0.9rem' }}>Загружается...</span>}
            {formData.avatarFile && (
              <span style={{ color: '#28a745', fontSize: '0.9rem' }}>
                ✓ Файл выбран: {formData.avatarFile.name}
              </span>
            )}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Навыки, которые могу преподать:
            </label>
            <select
              multiple
              value={formData.teachingCategories}
              onChange={(e) =>
                handleChange(
                  'teachingCategories',
                  Array.from(e.target.selectedOptions, (option) => option.value),
                )
              }
              disabled={skillsLoading}
              style={{
                padding: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                minHeight: '120px',
                width: '100%',
              }}
            >
              {(() => {
                if (skillsLoading) {
                  return <option disabled>Загрузка навыков...</option>;
                }
                if (hasSkillsError) {
                  return <option disabled>Ошибка: {skillsError}</option>;
                }
                return skills.map((skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.name}
                  </option>
                ));
              })()}
            </select>
            <small style={{ color: '#666', fontSize: '0.8rem' }}>
              Удерживайте Ctrl (Cmd на Mac) для выбора нескольких навыков
            </small>
          </div>

          <textarea
            placeholder="Расскажите о себе, своих компетенциях"
            value={formData.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            style={{
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              minHeight: '100px',
              resize: 'vertical',
            }}
          />

          <button
            type="submit"
            disabled={uploading}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: uploading ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: uploading ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          >
            {uploading ? 'Загрузка...' : 'Сохранить анкету'}
          </button>
        </form>
      </div>
    </div>
  );
};
