import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './profileCalendar.css';
import CreateTaskModal from '@/features/taskCreate/ui/CreateSpecialTask';

type Props = {
  bookedDates: Date[];
  availableDates: Date[];
  onChangeAvailableDates: (dates: Date[]) => void;
  userId: number; // Current user ID
  profileOwnerId: number; // Profile owner ID
  isOwnerView: boolean; // Add this prop
};

export default function UserCalendar({
  bookedDates,
  availableDates,
  onChangeAvailableDates,
  userId,
  profileOwnerId,
  isOwnerView,
}: Props): React.JSX.Element {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [availableHours, setAvailableHours] = useState<number[]>([]);
  const [bookedHours, setBookedHours] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<string>('');

  const isSameDay = (d1: Date, d2: Date): boolean =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const tileClassName = ({ date, view }: { date: Date; view: string }): string => {
    if (view === 'month') {
      if (bookedDates.find((d) => isSameDay(d, date))) return 'booked-date';
      if (availableDates.find((d) => isSameDay(d, date))) return 'available-date';
    }
    return '';
  };

  const handleClickDay = (date: Date): void => {
    if (isOwnerView) {
      return;
    }

    setSelectedDay(date);
  };

  const handleHourClick = (hour: number): void => {
    if (!selectedDay || isOwnerView) return;

    const dateTime = new Date(selectedDay);
    dateTime.setHours(hour, 0, 0, 0);

    setSelectedDateTime(dateTime.toISOString());
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!selectedDay || isOwnerView) return;

    const fetchHours = async (): Promise<void> => {
      const year = selectedDay.getFullYear();
      const month = String(selectedDay.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDay.getDate()).padStart(2, '0');
      const dateStr = `${year.toString()}-${month}-${day}`;

      try {
        const res = await fetch(
          `/api/tasks/user/${profileOwnerId.toString()}/hours?date=${dateStr}`,
        );
        if (!res.ok) throw new Error('Failed to fetch hours');
        const data = (await res.json()) as { available: number[]; booked: number[] };
        setAvailableHours(data.available);
        setBookedHours(data.booked);
      } catch (err) {
        console.error('Ошибка при загрузке часов', err);
      }
    };

    void fetchHours();
  }, [selectedDay, profileOwnerId, isOwnerView]);

  const getButtonColor = (isBooked: boolean, isAvailable: boolean): string => {
    if (isBooked) return '#ccc';
    return isAvailable ? '#4caf50' : '#f44336';
  };

  return (
    <div>
      <Calendar
        onClickDay={handleClickDay}
        tileClassName={tileClassName}
        className={isOwnerView ? 'owner-view' : 'visitor-view'}
      />

      {!isOwnerView && (
        <div
          style={{
            marginTop: '10px',
            padding: '10px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
          }}
        >
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#4caf50',
                  borderRadius: '3px',
                }}
              ></div>
              <span>Доступные даты</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: '#f44336',
                  borderRadius: '3px',
                }}
              ></div>
              <span>Забронированные даты</span>
            </div>
          </div>
        </div>
      )}

      {!isOwnerView && selectedDay && (
        <div style={{ marginTop: '10px' }}>
          <h4>Выберите час для бронирования {selectedDay.toLocaleDateString()}:</h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {Array.from({ length: 24 }, (_, i) => i).map((hour) => {
              const isBooked = bookedHours.includes(hour);
              const isAvailable = availableHours.includes(hour);
              return (
                <button
                  key={hour}
                  disabled={!isAvailable || isBooked}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: getButtonColor(isBooked, isAvailable),
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: !isAvailable || isBooked ? 'not-allowed' : 'pointer',
                  }}
                  onClick={() => handleHourClick(hour)}
                >
                  {hour}:00
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal only shows for non-owners */}
      {!isOwnerView && (
        <CreateTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          executorId={profileOwnerId}
          creatorId={userId}
          bookedDate={selectedDateTime}
        />
      )}
    </div>
  );
}
