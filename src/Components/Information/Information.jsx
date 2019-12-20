import React from 'react';
import './Information.css';
import { HashLink as Link } from 'react-router-hash-link';

const Information = () => {
  return (
    <section className="Information__container">
      <header className="info-header">
        <h1 className="Information__h1">Information</h1>
      </header>
      <h2 className="Information__h2">Table of Contents</h2>
      <ul className="Information__ul">
        <li>
          <Link smooth to="/info#about" className='link'>
            About
          </Link>
        </li>
        <li>
          <Link smooth to="/info#getting-started" className='link'>
            Getting Started
          </Link>
        </li>
      </ul>
      <hr/>
      <h3 id="about" className="Information__h3">
        About
      </h3>
      <p className="Information__paragraph">
        Anonygram is a new form of social media that allows users the freedom to
        explore and contribute to their current metros without feeling pressure
        to make an account or follow anyone. Posts are shown and created based
        on your area, so you can keep track of interesting and photogenic
        happenings with your hometown or while exploring new places. Wherever
        you are is where the action is, and your contributions can be shared to
        your corner of the world with no strings attached.
      </p>
      <p className="Information__paragraph">
        Choose between our modern, sortable feed or a map overview of your area
        to dive into posts. Feeling inspired by your fellow Anonygramers? Why
        not make an account and take advantage of additional features! Send real
        people in your community as much karma as you like. Want to know more
        about that post? Creating an account will let you join the conversation
        without revealing any personal information.
      </p>
      <hr/>
      <h3 id="getting-started" className="Information__h3">
        Getting Started
      </h3>
      <p className="Information__paragraph">
        Anonygram is safe, private, and easy to jump right into, whether you
        choose to create an account or not! We never ask for any personal information
        and regularly remove old content to ensure a care-free experience.
      </p>
      <h3 id="demo" className="Information__h3">Demo Account</h3>
      <ul className="Information__demo">
        <li>UN: admin</li>
        <li>PW: Password1!</li>
      </ul>
      <h4 className="Information__h4">Totally Anonymous</h4>
      <ol className="Information__ol">
        <li>
          Access the feed or map views to see the current posts available in
          your area
        </li>
        <li>Sort posts by freshness or most upvotes</li>
        <li>
          Upload your own original content with an optional caption to show off
          your own perspective
        </li>
      </ol>
      <h4 className="Information__h4">With A Secure Account</h4>
      <ol className="Information__ol">
        <li>Access the “Register” page to create a new account</li>
        <li>Take advantage of a karma pool to give kudos to your favorite posts</li>
        <li>
          Click or tap a post to comment with an anonymized username that keeps your identity
          private in every conversation
        </li>
      </ol>
    </section>
  );
};

export default Information;
