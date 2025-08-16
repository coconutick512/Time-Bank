import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocialButton } from './SocialButton';

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer>
      <div>
        <SocialButton platform="facebook" url="https://www.facebook.com/yourpage" />
        <SocialButton platform="twitter" url="https://www.twitter.com/yourpage" />
        <SocialButton platform="linkedin" url="https://www.linkedin.com/yourpage" />
        <SocialButton platform="instagram" url="https://www.instagram.com/yourpage" />
        <SocialButton platform="github" url="https://github.com/yourpage" />
      </div>
    </footer>
  );
};
