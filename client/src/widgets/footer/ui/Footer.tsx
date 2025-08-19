import { useNavigate } from 'react-router-dom';
import { SocialButton } from './SocialButton';
import './Footer.css';

export const Footer = (): React.JSX.Element => {
  const navigate = useNavigate();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Основная информация */}
        <div className="footer-section">
          <h3 className="footer-title">
            Банк <span className="blue">Времени</span>
          </h3>
          <p className="footer-desc">
            Обменивайтесь услугами за время, а не деньги. 
            Каждый час работы = 1 тайм-доллар.
          </p>
          <div className="footer-socials">
            <SocialButton platform="facebook" url="https://www.facebook.com/yourpage" />
            <SocialButton platform="twitter" url="https://www.twitter.com/yourpage" />
            <SocialButton platform="linkedin" url="https://www.linkedin.com/yourpage" />
            <SocialButton platform="instagram" url="https://www.instagram.com/yourpage" />
            <SocialButton platform="github" url="https://github.com/yourpage" />
          </div>
        </div>

        {/* Навигация */}
        <div className="footer-section">
          <h4>Навигация</h4>
          <ul className="footer-links">
            <li><button onClick={() => navigate('/')}>Главная</button></li>
            <li><button onClick={() => navigate('/executors')}>Специалисты</button></li>
            <li><button onClick={() => navigate('/services')}>Услуги</button></li>
            <li><button onClick={() => navigate('/about')}>О проекте</button></li>
          </ul>
        </div>

        {/* Полезные ссылки */}
        <div className="footer-section">
          <h4>Полезное</h4>
          <ul className="footer-links">
            <li><button onClick={() => navigate('/how-it-works')}>Как это работает</button></li>
            <li><button onClick={() => navigate('/faq')}>FAQ</button></li>
            <li><button onClick={() => navigate('/rules')}>Правила</button></li>
            <li><button onClick={() => navigate('/support')}>Поддержка</button></li>
          </ul>
        </div>

        {/* Контакты и статистика */}
        <div className="footer-section">
          <h4>Контакты</h4>
          <div className="footer-contacts">
            <p>📧 info@timebank.ru</p>
            <p>📞 +7 (999) 123-45-67</p>
          </div>
          
          <div className="footer-stats">
            <span className="footer-stat">
              <b>500+</b> Участников
            </span>
            <span className="footer-stat">
              <b className="stat-green">1000+</b> Услуг
            </span>
          </div>
        </div>
      </div>

      {/* Нижняя часть футера */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>© 2025 Банк Времени. Все права защищены.</p>
          <div className="footer-legal">
            <button onClick={() => navigate('/privacy')}>Политика конфиденциальности</button>
            <button onClick={() => navigate('/terms')}>Условия использования</button>
          </div>
        </div>
      </div>
    </footer>
  );
};