/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import './index.css';
import './shared/i18n.ts';

createRoot(document.getElementById('root')!).render(<App />);
