import { useNavigate } from 'react-router-dom';
import { Typography, Stack, Box } from '@mui/material';
import {
  FooterContainer,
  FooterContent,
  FooterSection,
  FooterTitle,
  BlueSpan,
  FooterDesc,
  FooterSocials,
  FooterLinks,
  FooterLinkItem,
  FooterLinkButton,
  FooterContacts,
  FooterStats,
  FooterStatBold,
  StatGreen,
  FooterBottom,
  FooterBottomContent,
  FooterLegalButton,
} from './Footer.styles.ts';
import { SocialButton } from './SocialButton';

export const Footer = (): React.JSX.Element => {
  const navigate = useNavigate();

  return (
    <FooterContainer component="footer">
      <FooterContent>
        {/* Основная информация */}
        <FooterSection>
          <FooterTitle variant="h3">
            Банк <BlueSpan>Времени</BlueSpan>
          </FooterTitle>
          <FooterDesc>
            Обменивайтесь услугами за время, а не деньги. Каждый час работы = 1 тайм-доллар.
          </FooterDesc>
          <FooterSocials>
            <SocialButton platform="facebook" url="https://www.facebook.com/yourpage" />
            <SocialButton platform="twitter" url="https://www.twitter.com/yourpage" />
            <SocialButton platform="linkedin" url="https://www.linkedin.com/yourpage" />
            <SocialButton platform="instagram" url="https://www.instagram.com/yourpage" />
            <SocialButton platform="github" url="https://github.com/yourpage" />
          </FooterSocials>
        </FooterSection>

        {/* Навигация */}
        <FooterSection>
          <Typography variant="h4">Навигация</Typography>
          <FooterLinks>
            <FooterLinkItem>
              <FooterLinkButton onClick={() => navigate('/')}>Главная</FooterLinkButton>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLinkButton onClick={() => navigate('/executors')}>
                Специалисты
              </FooterLinkButton>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLinkButton onClick={() => navigate('/services')}>Услуги</FooterLinkButton>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLinkButton onClick={() => navigate('/about')}>О проекте</FooterLinkButton>
            </FooterLinkItem>
          </FooterLinks>
        </FooterSection>

        {/* Полезные ссылки */}
        <FooterSection>
          <Typography variant="h4">Полезное</Typography>
          <FooterLinks>
            <FooterLinkItem>
              <FooterLinkButton onClick={() => navigate('/how-it-works')}>
                Как это работает
              </FooterLinkButton>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLinkButton onClick={() => navigate('/faq')}>FAQ</FooterLinkButton>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLinkButton onClick={() => navigate('/rules')}>Правила</FooterLinkButton>
            </FooterLinkItem>
            <FooterLinkItem>
              <FooterLinkButton onClick={() => navigate('/support')}>Поддержка</FooterLinkButton>
            </FooterLinkItem>
          </FooterLinks>
        </FooterSection>

        {/* Контакты и статистика */}
        <FooterSection>
          <Typography variant="h4">Контакты</Typography>
          <FooterContacts>
            <Typography>📧 info@timebank.ru</Typography>
            <Typography>📞 +7 (999) 123-45-67</Typography>
          </FooterContacts>
          <FooterStats>
            <Box component="span" className="footer-stat">
              <FooterStatBold>2+</FooterStatBold> Участников
            </Box>
            <Box component="span" className="footer-stat">
              <StatGreen>3+</StatGreen> Услуг
            </Box>
          </FooterStats>
        </FooterSection>
      </FooterContent>

      {/* Нижняя часть футера */}
      <FooterBottom>
        <FooterBottomContent>
          <Typography>© 2025 Банк Времени. Все права защищены.</Typography>
          <Stack direction="row" spacing={2} className="footer-legal">
            <FooterLegalButton onClick={() => navigate('/privacy')}>
              Политика конфиденциальности
            </FooterLegalButton>
            <FooterLegalButton onClick={() => navigate('/terms')}>
              Условия использования
            </FooterLegalButton>
          </Stack>
        </FooterBottomContent>
      </FooterBottom>
    </FooterContainer>
  );
};
