import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './profileCalendar.css';
import CreateTaskModal from '@/features/taskCreate/ui/CreateSpecialTask';

type Props = {
  bookedDates: Date[];
  availableDates: Date[];
  onChangeAvailableDates: (dates: Date[]) => void;
  userId: number;
  profileOwnerId: number;
  isOwnerView: boolean;
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
      const dateStr = `${year}-${month}-${day}`;

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

  return (
    <div>
      <Calendar
        onClickDay={handleClickDay}
        tileClassName={tileClassName}
        className={isOwnerView ? 'owner-view' : 'visitor-view'}
      />

      {!isOwnerView && (
        <div className="legend">
          <div className="legend-item">
            <div className="legend-color legend-available" />
            <span>Доступные даты</span>
          </div>
          <div className="legend-item">
            <div className="legend-color legend-booked" />
            <span>Забронированные даты</span>
          </div>
        </div>
      )}

      {!isOwnerView && selectedDay && (
        <section>
          <h4 className="hours-selection">
            Выберите час для бронирования {selectedDay.toLocaleDateString()}:
          </h4>
          <div className="hours-buttons">
            {Array.from({ length: 24 }, (_, i) => i).map((hour) => {
              const isBooked = bookedHours.includes(hour);
              const isAvailable = availableHours.includes(hour);
              return (
                <button
                  key={hour}
                  disabled={!isAvailable || isBooked}
                  onClick={() => handleHourClick(hour)}
                  className={`hours-button ${
                    isBooked ? 'booked' : isAvailable ? 'available' : 'unavailable'
                  }`}
                >
                  {hour}:00
                </button>
              );
            })}
          </div>
        </section>
      )}

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
