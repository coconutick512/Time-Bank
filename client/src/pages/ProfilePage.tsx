import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { useEffect, useState } from 'react';
import { fetchUserSkills } from '@/entities/user/model/userThunk';
import { fetchUserTasks, fetchUserExecutedTasks } from '@/entities/tasks/model/tasksThunk';
import UserCalendar from '@/widgets/calendar/ui/profileCalendar';
import { useParams } from 'react-router-dom';
import { fetchUserById } from '@/entities/user/model/userThunk';
import ProfileEditForm from '@/widgets/UserProfileForm/ui/ProfilePageEdit';
import './ProfilePage.css';

export default function ProfilePage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { userId } = useParams<{ userId: string }>();

  const currentUser = useAppSelector((state) => state.user.user);
  const { skills, status, viewingUser, viewingUserSkills } = useAppSelector((state) => state.user);
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const executedTasks = useAppSelector((state) => state.tasks.executedTasks);

  // Определяем, чей профиль показывается
  const isOwnerProfile = !userId || Number(userId) === currentUser?.id;

  const profileUser = isOwnerProfile ? currentUser : viewingUser;
  const profileSkills = isOwnerProfile ? skills : viewingUserSkills;

  const [isOwner, setIsOwner] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const mockReviews = [
    { id: 1, text: 'Отличный преподаватель!', rating: 5 },
    { id: 2, text: 'Все было понятно и интересно', rating: 4 },
    { id: 3, text: 'Нормально, но можно лучше', rating: 3 },
    { id: 4, text: 'Очень помог разобраться в теме', rating: 5 },
  ];

  const getAvailableDates = (dates: string | string[] | null | undefined): Date[] => {
    if (!dates) return [];
    if (Array.isArray(dates)) return dates.map((date) => new Date(date));
    return [new Date(dates)];
  };

  const handleEditSuccess = (): void => {
    setIsEditing(false);
    if (profileUser?.id) {
      void dispatch(fetchUserById(profileUser.id));
      void dispatch(fetchUserSkills(profileUser.id));
    }
  };

  useEffect(() => {
    const targetUserId = userId ? parseInt(userId, 10) : currentUser?.id;
    const isViewingOwnProfile = !userId || Number(currentUser?.id) === targetUserId;

    setIsOwner(isViewingOwnProfile);

    if (!targetUserId) return;

    void dispatch(fetchUserExecutedTasks(targetUserId));
    void dispatch(fetchUserTasks(targetUserId));

    if (isViewingOwnProfile) {
      void dispatch(fetchUserSkills(targetUserId));
    } else {
      void dispatch(fetchUserById(targetUserId));
      void dispatch(fetchUserSkills(targetUserId));
    }
  }, [dispatch, userId, currentUser?.id]);

  if (status === 'loading' || (!profileUser && userId)) {
    return <div className="profile-loader">Loading...</div>;
  }

  if (!profileUser) {
    return <div className="profile-notfound">User not found</div>;
  }

  // Вычисление среднего рейтинга
  const avgRating =
    mockReviews.reduce((acc, review) => acc + review.rating, 0) / (mockReviews.length || 1);
  const stars = Array.from({ length: 5 }, (_, i) => (i < Math.floor(avgRating) ? '★' : '☆'));

  return (
    <div className="profile-root">
      {/* Profile Header */}
      <div className="profile-content">
        <header className="profile-header">
          <img
            className="profile-avatar"
            src={
              profileUser.avatar
                ? `http://localhost:3000/api/uploads/avatars/${profileUser.avatar}`
                : '/default-avatar.png'
            }
            alt="avatar"
          />
          <div className="profile-basic">
            <h2>{profileUser.name}</h2>
            <p>{profileUser.city}</p>
            <p>{profileUser.timezone}</p>

            <div className="profile-btns">
              {isOwner ? (
                <button className="profile-btn" onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? 'Отменить' : 'Редактировать профиль'}
                </button>
              ) : (
                <button className="profile-btn-alt">Связаться</button>
              )}
            </div>

            <div className="profile-reviews-summary">
              <div className="profile-stars">{stars.join('')}</div>
              <p className="profile-avg">
                {avgRating.toFixed(1)}/5 ({mockReviews.length} отзывов)
              </p>
            </div>
          </div>
        </header>

        {/* Profile Main Content */}
        <main className="profile-mainArea">
          {isEditing && isOwner ? (
            <ProfileEditForm
              user={profileUser}
              skills={profileSkills?.skills ?? []}
              onCancel={() => setIsEditing(false)}
              onSuccess={handleEditSuccess}
            />
          ) : (
            <>
              <section className="profile-col">
                <div className="profile-section">
                  <h3>О себе</h3>
                  <p>{profileUser.about ?? 'Нет информации'}</p>
                </div>

                <div className="profile-section">
                  <h3>Навыки</h3>
                  <div className="profile-skills-list">
                    {profileSkills?.skills.map((skill) => (
                      <span className="profile-skill-badge" key={skill.id}>
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="profile-section">
                  <h3>Информация</h3>
                  <p>
                    Участник с{' '}
                    {profileUser.created_at
                      ? new Date(profileUser.created_at).toLocaleDateString()
                      : 'Дата регистрации неизвестна'}
                  </p>
                </div>
              </section>

              <section className="profile-col">
                <div className="profile-section">
                  <h3>{isOwner ? 'Управление расписанием' : 'Доступные даты'}</h3>
                  <UserCalendar
                    userId={currentUser?.id ?? 0}
                    profileOwnerId={profileUser.id}
                    bookedDates={executedTasks.flatMap((t) => {
                      if (!t.bookedDates) return [];
                      if (Array.isArray(t.bookedDates)) {
                        return t.bookedDates.map((date) => new Date(date));
                      }
                      return [new Date(t.bookedDates)];
                    })}
                    availableDates={getAvailableDates(profileUser.availableDates)}
                    onChangeAvailableDates={(dates) => {
                      const isoStrings = dates.map((d) => d.toISOString());
                      console.log('Selected dates:', isoStrings);
                      // TODO: Save available dates if owner
                    }}
                    isOwnerView={isOwner}
                  />
                </div>

                <div className="profile-section">
                  <h3>Мои задания</h3>
                  <div>
                    {tasks.map((task) => (
                      <div className="profile-task-item" key={task.id}>
                        <h4>{task.title}</h4>
                        <p>{task.description}</p>
                        <p className="profile-task-status">Статус: {task.status}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}
        </main>

        {/* Reviews Section for non-owners */}
        {!isOwner && (
          <section className="profile-reviews-section">
            <h3>Отзывы</h3>
            <div>
              {mockReviews.slice(-3).map((review) => (
                <article className="profile-review-item" key={review.id}>
                  <div className="profile-review-stars">
                    {'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}
                  </div>
                  <p className="profile-review-text">{review.text}</p>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
