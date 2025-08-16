import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

export default function MainPage(): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="main-root">
      {/* Header */}
      <section className="main-header">
        <div className="main-header-left">
          <h1>
            Первый в России <span className="blue">Банк</span>{' '}
            <span className="greenblue">Времени</span>
          </h1>
          <p className="main-desc">
            Обменивайтесь услугами за время, а не деньги. Каждый час работы = 1 тайм-доллар. Все
            услуги равны по стоимости.
          </p>
          <div className="main-btns">
            <button className="primary" onClick={() => navigate('/executors')}>
              Найти специалиста
            </button>
            <button className="secondary">Как это работает?</button>
          </div>
          <div className="main-stats">
            <span>
              <b>500+</b> Участников
            </span>
            <span>
              <b className="stat-green">1000+</b> Услуг оказано
            </span>
            <span>
              <span className="stat-td">5000 TD</span> В обороте
            </span>
          </div>
        </div>
        <div className="main-header-right">
          <img src="/clock-handshake.png" alt="clock" className="main-image" />
        </div>
      </section>

      {/* Cards */}
      <section className="main-how">
        <h2>Как работает банк времени?</h2>
        <p className="main-how-desc">Простая система обмена услугами на основе времени</p>
        <div className="main-cards">
          <div className="main-card">
            <div className="main-card-icon">👤</div>
            <h3>1. Регистрируйтесь</h3>
            <p>
              Создайте профиль и укажите свои навыки.
              <br />
              Получите стартовые тайм-доллары.
            </p>
          </div>
          <div className="main-card">
            <div className="main-card-icon">⏰</div>
            <h3>2. Предлагайте услуги</h3>
            <p>
              За каждый час работы получайте 1 тайм-доллар.
              <br />
              Неважно что вы делаете — всё равно!
            </p>
          </div>
          <div className="main-card">
            <div className="main-card-icon">📈</div>
            <h3>3. Тратьте TD</h3>
            <p>
              Используйте тайм-доллары для получения
              <br />
              любых услуг от других участников.
            </p>
          </div>
        </div>
      </section>

      {/* Почему банк времени */}
      <section className="main-why">
        <div className="main-why-left">
          <h2>Почему банк времени?</h2>
          <div className="why-desc">
            Справедливая система обмена, где ценится время, а не статус услуги
          </div>
          <ul className="why-list">
            <li>Час юриста = час садовника = час программиста</li>
            <li>Без комиссий и скрытых платежей</li>
            <li>Развитие местных сообществ</li>
            <li>Взаимопомощь и социальные связи</li>
          </ul>
          <button className="why-btn" onClick={() => navigate('/login')}>
            Начать сейчас
          </button>
        </div>
        <div className="main-why-right">
          <div className="safety-card">
            <div className="safety-icon">🛡️</div>
            <div>
              <b>Безопасно и надёжно</b>
              <p>
                Система рейтингов, отзывов и модерации обеспечивает
                <br />
                безопасность всех участников банка времени.
              </p>
              <div className="safety-rating">
                <span>4.9 ⭐</span> Средний рейтинг участников
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="main-cta">
        <h2>Присоединяйтесь к революции времени</h2>
        <p>
          Станьте частью нового экономического сообщества, где время — это деньги в прямом смысле
        </p>
        <div className="main-btns">
          <button className="primary" onClick={() => navigate('/login')}>
            Зарегистрироваться
          </button>
          <button className="secondary">Узнать больше</button>
        </div>
      </section>
    </div>
  );
}
