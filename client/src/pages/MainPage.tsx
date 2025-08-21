import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Grid, Typography, Card, CardContent, Box } from '@mui/material';
import './MainPage.css';
import { fetchUser } from '@/entities/user/model/userThunk';
import { useAppDispatch } from '@/shared/hooks/hooks';

export default function MainPage(): React.JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Box className="main-root">
      {/* Header Section */}
      <Container maxWidth="lg">
        <Box className="main-header">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" className="main-header-title">
                Обменивайтесь навыками за время, а не деньги
              </Typography>
              <Typography variant="body1" className="main-desc">
                Твоя гавань для бартера навыками — без оплаты, только обучение.
              </Typography>
              <Box className="main-btns">
                <Button
                  variant="contained"
                  className="primary"
                  onClick={() => navigate('/executors')}
                >
                  Присоединиться
                </Button>
                <Button variant="outlined" className="secondary">
                  Больше о нас
                </Button>
              </Box>
              <Box className="main-stats">
                <Typography>
                  <b>500+</b> Участников
                </Typography>
                <Typography>
                  <b className="stat-green">1000+</b> Услуг оказано
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} className="main-header-right">
              {/* Uncomment if image is needed */}
              {/* <img src="/clock-handshake.png" alt="clock" className="main-image" /> */}
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* How It Works Section */}
      <Container maxWidth="lg" className="main-how">
        <Typography variant="h4" align="center">
          Как работает?
        </Typography>
        <Typography variant="body1" align="center" className="main-how-desc">
          Простая система обмена услугами на основе времени
        </Typography>
        <Grid container spacing={3} className="main-cards">
          {[
            {
              icon: '👤',
              title: '1. Регистрируйтесь',
              desc: 'Создайте профиль и укажите свои навыки. Получите стартовые часы.',
            },
            {
              icon: '⏰',
              title: '2. Предлагайте услуги',
              desc: 'За каждый час работы, получайте эти же часы на свой баланс. Неважно что вы делаете — все равно!',
            },
            {
              icon: '📈',
              title: '3. Обменивайте на навыки',
              desc: 'Используйте накопленные часы для получения любых услуг от других участников.',
            },
          ].map((card, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card className="main-card">
                <CardContent>
                  <Box className="main-card-icon">{card.icon}</Box>
                  <Typography variant="h6">{card.title}</Typography>
                  <Typography variant="body2">{card.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Why Time Bank Section */}
      <Container maxWidth="lg" className="main-why">
        <Grid container spacing={4} alignItems="flex-start">
          <Grid item xs={12} md={6}>
            <Typography variant="h4">Почему?</Typography>
            <Typography className="why-desc">
              Справедливая система обмена, где ценится время, а не статус услуги
            </Typography>
            <ul className="why-list">
              {[
                'Час юриста = час художника = час программиста',
                'Без комиссий и скрытых платежей',
                'Развитие местных сообществ',
                'Взаимопомощь и социальные связи',
              ].map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <Button
              variant="contained"
              className="why-btn"
              onClick={() => navigate('/login')}
            >
              Начать сейчас
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className="safety-card">
              <CardContent>
                <Typography variant="h6">
                  <b>Безопасно и надёжно</b>
                </Typography>
                <Typography variant="body2">
                  Система рейтингов, отзывов и модерации обеспечивает безопасность всех участников банка времени.
                </Typography>
                <Typography variant="body2">
                  Каждый пользователь может пройти проверку личности и компетенций.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box className="main-cta">
        <Container maxWidth="lg" style={{ textAlign: 'center' }}>
          <Typography variant="h4">
            Присоединяйтесь к революции времени
          </Typography>
          <Typography variant="body1">
            Станьте частью нового экономического сообщества, где время — это деньги в прямом смысле
          </Typography>
          <Box className="main-btns">
            <Button
              variant="contained"
              className="primary"
              onClick={() => navigate('/login')}
            >
              Зарегистрироваться
            </Button>
            <Button variant="outlined" className="secondary">
              Узнать больше
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}