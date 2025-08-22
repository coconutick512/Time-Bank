import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, CardContent } from '@mui/material';
import { fetchUser } from '@/entities/user/model/userThunk';
import { useAppDispatch } from '@/shared/hooks/hooks';
import {
  MainRoot,
  MainHeader,
  MainHeaderTitle,
  MainDesc,
  MainButtons,
  PrimaryButton,
  SecondaryButton,
  MainStats,
  StatGreen,
  MainHeaderRight,
  MainHow,
  MainHowDesc,
  MainCards,
  MainCard,
  MainCardIcon,
  MainWhy,
  WhyDesc,
  WhyList,
  WhyButton,
  SafetyCard,
  MainCta,
} from './MainPage.styles.ts';

export default function MainPage(): React.JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = 'Банк'
    void dispatch(fetchUser());
  }, [dispatch]);

  return (
    <MainRoot>
      {/* Header Section */}
      <Container maxWidth="lg">
        <MainHeader>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <MainHeaderTitle variant="h3">
                Обменивайтесь навыками за время, а не деньги
              </MainHeaderTitle>
              <MainDesc variant="body1">
                Твоя гавань для бартера навыками — без оплаты, только обучение.
              </MainDesc>
              <MainButtons>
                <PrimaryButton variant="contained" onClick={() => navigate('/executors')}>
                  Присоединиться
                </PrimaryButton>
                <SecondaryButton variant="outlined">Больше о нас</SecondaryButton>
              </MainButtons>
              <MainStats>
                <Typography>
                  <b>500+</b> Участников
                </Typography>
                <Typography>
                  <b>
                    <StatGreen>1000+</StatGreen>
                  </b>{' '}
                  Услуг оказано
                </Typography>
              </MainStats>
            </Grid>
            <Grid item xs={12} md={6} component={MainHeaderRight}>
              {/* Uncomment if image is needed */}
              {/* <img src="/clock-handshake.png" alt="clock" style={{ width: '100%' }} /> */}
            </Grid>
          </Grid>
        </MainHeader>
      </Container>

      {/* How It Works Section */}
      <MainHow maxWidth="lg">
        <Typography variant="h4" align="center">
          Как работает?
        </Typography>
        <MainHowDesc variant="body1" align="center">
          Простая система обмена услугами на основе времени
        </MainHowDesc>
        <MainCards container spacing={3}>
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
              <MainCard>
                <CardContent>
                  <MainCardIcon>{card.icon}</MainCardIcon>
                  <Typography variant="h6">{card.title}</Typography>
                  <Typography variant="body2">{card.desc}</Typography>
                </CardContent>
              </MainCard>
            </Grid>
          ))}
        </MainCards>
      </MainHow>

      {/* Why Time Bank Section */}
      <MainWhy maxWidth="lg">
        <Grid container spacing={4} alignItems="flex-start">
          <Grid item xs={12} md={6}>
            <Typography variant="h4">Почему?</Typography>
            <WhyDesc>Справедливая система обмена, где ценится время, а не статус услуги</WhyDesc>
            <WhyList>
              {[
                'Час юриста = час художника = час программиста',
                'Без комиссий и скрытых платежей',
                'Развитие местных сообществ',
                'Взаимопомощь и социальные связи',
              ].map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </WhyList>
            <WhyButton variant="contained" onClick={() => navigate('/login')}>
              Начать сейчас
            </WhyButton>
          </Grid>
          <Grid item xs={12} md={6}>
            <SafetyCard>
              <CardContent>
                <Typography variant="h6">
                  <b>Безопасно и надёжно</b>
                </Typography>
                <Typography variant="body2">
                  Система рейтингов, отзывов и модерации обеспечивает безопасность всех участников
                  банка времени.
                </Typography>
                <Typography variant="body2">
                  Каждый пользователь может пройти проверку личности и компетенций.
                </Typography>
              </CardContent>
            </SafetyCard>
          </Grid>
        </Grid>
      </MainWhy>

      {/* Call to Action Section */}
      <MainCta>
        <Container maxWidth="lg" style={{ textAlign: 'center' }}>
          <Typography variant="h4">Присоединяйтесь к революции времени</Typography>
          <Typography variant="body1">
            Станьте частью нового экономического сообщества, где время — это деньги в прямом смысле
          </Typography>
          <MainButtons>
            <PrimaryButton variant="contained" onClick={() => navigate('/login')}>
              Зарегистрироваться
            </PrimaryButton>
            <SecondaryButton variant="outlined">Узнать больше</SecondaryButton>
          </MainButtons>
        </Container>
      </MainCta>
    </MainRoot>
  );
}
