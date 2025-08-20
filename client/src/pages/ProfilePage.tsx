import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { useEffect, useState } from 'react';
import { fetchUserSkills } from '@/entities/user/model/userThunk';
import { fetchUserTasks, fetchUserExecutedTasks } from '@/entities/tasks/model/tasksThunk';
import UserCalendar from '@/widgets/calendar/ui/profileCalendar';
import { useParams } from 'react-router-dom';
import { fetchUserById } from '@/entities/user/model/userThunk';
import ProfileEditForm from '@/widgets/UserProfileForm/ui/ProfilePageEdit';

export default function ProfilePage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { userId } = useParams<{ userId: string }>();

  const currentUser = useAppSelector((state) => state.user.user);
  const { skills, status, viewingUser, viewingUserSkills } = useAppSelector((state) => state.user);
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const executedTasks = useAppSelector((state) => state.tasks.executedTasks);

  // Determine which user data to use
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
    // Refetch user data to get updated information
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

    // Fetch executed tasks for calendar (where user is executor)
    void dispatch(fetchUserExecutedTasks(targetUserId));

    // Fetch created tasks for display (where user is creator)
    void dispatch(fetchUserTasks(targetUserId));

    if (isViewingOwnProfile) {
      void dispatch(fetchUserSkills(targetUserId));
    } else {
      void dispatch(fetchUserById(targetUserId));
      void dispatch(fetchUserSkills(targetUserId));
    }
  }, [dispatch, userId, currentUser?.id]);
  const oneCity = profileUser?.city.split(' ')[0];

  if (status === 'loading' || (!profileUser && userId)) {
    return <div>Loading...</div>;
  }

  if (!profileUser) {
    return <div>User not found</div>;
  }

  return (
    <div>
      {/* Profile Header */}
      <div>
        <div>
          <div>
            <img
              src={
                profileUser.avatar
                  ? `http://localhost:3000/api/uploads/avatars/${profileUser.avatar}`
                  : '/default-avatar.png'
              }
              alt="avatar"
            />
            <div>
              <h2>{profileUser.name}</h2>
              <p>{profileUser.city}</p>
              <p>{profileUser.timezone}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div>
            {isOwner ? (
              <>
                <button onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? 'Отменить' : 'Редактировать профиль'}
                </button>
              </>
            ) : (
              <button>Связаться</button>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div>
          {mockReviews.length > 0 ? (
            (() => {
              const avgRating =
                mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length;
              const stars = Array.from({ length: 5 }, (_, i) =>
                i < Math.floor(avgRating) ? '★' : '☆',
              );
              return (
                <div>
                  <div>{stars.join('')}</div>
                  <p>
                    {avgRating.toFixed(1)}/5 ({mockReviews.length} отзывов)
                  </p>
                </div>
              );
            })()
          ) : (
            <p>Пока нет отзывов</p>
          )}
        </div>
      </div>

      {/* Profile Content */}
      <div>
        {isEditing && isOwner ? (
          <ProfileEditForm
            user={profileUser}
            skills={profileSkills?.skills || []}
            onCancel={() => setIsEditing(false)}
            onSuccess={handleEditSuccess}
          />
        ) : (
          <>
            {/* Left Column */}
            <div>
              {/* About Section */}
              <div>
                <h3>О себе</h3>
                <p>{profileUser.about ?? 'Нет информации'}</p>
              </div>

              {/* Skills Section */}
              <div>
                <h3>Навыки</h3>
                <div>
                  {profileSkills?.skills.map((skill) => (
                    <span key={skill.id}>{skill.name}</span>
                  ))}
                </div>
              </div>

              {/* Registration Info */}
              <div>
                <h3>Информация</h3>
                <p>
                  Участник с{' '}
                  {profileUser.created_at
                    ? new Date(profileUser.created_at).toLocaleDateString()
                    : 'Дата регистрации неизвестна'}
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* Calendar Section */}
              <div>
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

              <div>
                <h3>Мои задания</h3>
                <div>
                  {tasks.map((task) => (
                    <div key={task.id}>
                      <h4>{task.title}</h4>
                      <p>{task.description}</p>
                      <p>Статус: {task.status}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Reviews Section for non-owners */}
      {!isOwner && (
        <div>
          <h3>Отзывы</h3>
          <div>
            {mockReviews.slice(-3).map((review) => (
              <div key={review.id}>
                <div>
                  <div>{'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}</div>
                </div>
                <p>{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
