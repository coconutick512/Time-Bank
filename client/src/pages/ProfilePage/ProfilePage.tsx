import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { useEffect, useState } from 'react';
import { fetchUserSkills } from '@/entities/user/model/userThunk';
import { fetchUserTasks, fetchUserExecutedTasks } from '@/entities/tasks/model/tasksThunk';
import { fetchReviewsByUserId, fetchAverageRating } from '@/entities/reviews/model/reviewThunk';
import UserCalendar from '@/widgets/calendar/ui/profileCalendar';
import { useParams } from 'react-router-dom';
import { fetchUserById } from '@/entities/user/model/userThunk';
import { Avatar } from '@mui/material';
import ProfileEditForm from '@/widgets/UserProfileForm/ui/ProfilePageEdit';

export default function ProfilePage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { userId } = useParams<{ userId: string }>();

  const currentUser = useAppSelector((state) => state.user.user);
  const { skills, status, viewingUser, viewingUserSkills } = useAppSelector((state) => state.user);
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const executedTasks = useAppSelector((state) => state.tasks.executedTasks);
  const { reviews, averageRating } = useAppSelector((state) => state.review);

  // Определяем, чей профиль показывается
  const isOwnerProfile = !userId || Number(userId) === currentUser?.id;

  const profileUser = isOwnerProfile ? currentUser : viewingUser;
  const profileSkills = isOwnerProfile ? skills : viewingUserSkills;

  const [isOwner, setIsOwner] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
    document.title = 'Профиль';
    const targetUserId = userId ? parseInt(userId, 10) : currentUser?.id;
    const isViewingOwnProfile = !userId || Number(currentUser?.id) === targetUserId;

    setIsOwner(isViewingOwnProfile);

    if (!targetUserId) return;

    void dispatch(fetchUserExecutedTasks(targetUserId));
    void dispatch(fetchUserTasks(targetUserId));
    
    // Fetch reviews for the profile user
    void dispatch(fetchReviewsByUserId(targetUserId));
    void dispatch(fetchAverageRating(targetUserId));

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

  // Calculate average rating from real data with proper null checks
  const avgRating = averageRating?.averageRating ?? 0;
  const totalReviews = averageRating?.totalReviews ?? 0;
  const stars = Array.from({ length: 5 }, (_, i) => (i < Math.floor(avgRating) ? '★' : '☆'));

  return (
    <div className="profile-root">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-header-content">
          <div className="profile-avatar-section">
            <Avatar
              src={profileUser.avatar ? `http://localhost:3000/api/uploads/avatars/${profileUser.avatar}` : undefined}
              className="executor-avatar"
              alt={profileUser.name}
            />
            <div className="profile-info">
              <h2>{profileUser.name}</h2>
              <p>Баланс: {profileUser.balance} TD</p>
              <p>Город: {profileUser.city ?? 'Не указан'}</p>
              <p>Часовой пояс: {profileUser.timezone ?? 'Не указан'}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="profile-actions">
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
              {avgRating.toFixed(1)}/5 ({totalReviews} отзывов)
            </p>
          </div>
        </div>
      </div>

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
                  {profileSkills?.skills?.map((skill) => (
                    <span className="profile-skill-badge" key={skill.id}>
                      {skill.name}
                    </span>
                  ))}
                  {(!profileSkills?.skills || profileSkills.skills.length === 0) && (
                    <p>Навыки не указаны</p>
                  )}
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
                  {tasks.length === 0 && <p>Задания не найдены</p>}
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
          <div className="profile-reviews-list">
            {reviews.slice(-3).map((review) => (
              <article className="profile-review-item" key={review.id}>
                <div className="profile-review-stars">
                  {'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}
                </div>
                <p className="profile-review-text">{review.comment ?? 'Без комментария'}</p>
                <p className="profile-review-author">— {review.author.name}</p>
                {review.Task && (
                  <p className="profile-review-task">Задание: {review.Task.title}</p>
                )}
              </article>
            ))}
            {reviews.length === 0 && <p>Отзывов пока нет</p>}
          </div>
        </section>
      )}
    </div>
  );
}
