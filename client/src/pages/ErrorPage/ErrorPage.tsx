import React from 'react';
import './ErrorPage.css';
import { Link } from 'react-router-dom';

export default function ErrorPage(): React.JSX.Element {
  return (
    <div className="page-wrapper">
      <section className="page_404">
        <div className="container">
          <div className="content-wrapper">
            <div className="four_zero_four_bg"></div>

            <div className="contant_box_404">
              <h3 className="h2" style={{ color: 'black' }}>
                Кажется Вы потерялись
              </h3>
              <p style={{ color: 'black' }}>Такой страницы не существует</p>
              <Link to="/" className="link_404">
                Вернуться на главную{' '}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
