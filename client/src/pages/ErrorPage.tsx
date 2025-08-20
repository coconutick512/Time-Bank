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
              <h3 className="h2" style={{ color: 'black' }}>Looks like you&apos;re lost</h3>
              <p style={{ color: 'black' }}>The page you are looking for is not available!</p>
              <Link to="/" className="link_404" >
                Go to Home Page
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}