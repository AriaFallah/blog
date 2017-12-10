import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Aux } from '../util';

const CURRENT_YEAR = new Date().getFullYear();

class Site extends React.Component {
  render() {
    return (
      <Aux>
        <Helmet>
          <meta name="description" content="Aria Fallah's blog about programming and other things too" />
          <meta name="HandheldFriendly" content="True" />
          <meta http-equiv="cache-control" content="max-age=0" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            name="google-site-verification"
            content="bbTP0B3Joyt2uJViZb5qeGxHhf4TSIgntjl3fitB6Mc"
          />
          <link
            rel="shortcut icon"
            type="image/png"
            href="/assets/icons/favicon.ico"
          />
        </Helmet>

        <div className="content">
          <nav className="nav">
            <a href="/">
              <img className="home" src="/assets/icons/home.svg" alt="home" />
            </a>
            <a href="/about.html">
              <img
                className="about"
                src="/assets/icons/question.svg"
                alt="about"
              />
            </a>
            <a href="https://www.aria.ai">
              <img className="logo" src="/assets/icons/logo.svg" alt="logo" />
            </a>
          </nav>
          <main className="main">{this.props.children}</main>
        </div>
        <footer className="footer">
          <div>Aria Fallah ©</div>
          <div>All Rights Reserved - {CURRENT_YEAR}</div>
        </footer>
      </Aux>
    );
  }
}

export { Site };
