import React from 'react';
import { Link } from 'react-router-dom'
import './NotFoundPage.css';

export default function NotFoundPage() {
  return (
    <section className="not-found-page">
      <h2 className="not-found-h2">404 - page not found</h2>
      <Link 
        to="/"
        className="nav-link resetStyles">
          Take me home
        </Link>
    </section>
  )
}