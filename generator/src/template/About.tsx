import * as React from 'react';
import { Helmet } from 'react-helmet';
import { PostHeader } from './PostHeader';
import { Aux } from '../util';

class About extends React.Component {
  render() {
    return (
      <Aux>
        <Helmet>
          <title>About Me</title>
        </Helmet>
        <h2>About me</h2>
        <p>
          Hi, my name is <a href="https://www.aria.ai">Aria Fallah</a>, and I'm
          a senior studying Computer Science and Mathematics at UMBC. During the
          school year, I intern at{' '}
          <a href="https://fiscalnote.com/">FiscalNote</a> performing multiple
          roles ranging from building UIs to working with big data and ETL
          pipelines. Last summer, I interned at Facebook developing the
          infrastructure and interfaces that enable people to purchase movie
          tickets on the site. After I graduate, I'm excited to join Facebook as
          a full time Software Engineer. Outside of work, I like to spend my
          time on <a href="https://www.github.com/AriaFallah">side projects</a>,{' '}
          <a href="https://www.instagram.com/m0meni">photography</a>, and
          exercise.
        </p>
        <p>
          This blog is{' '}
          <a href="https://www.github.com/AriaFallah/blog">open source</a>, and
          generated using a{' '}
          <a href="https://github.com/AriaFallah/blog/tree/master/generator">
            static site generator
          </a>{' '}
          that I wrote myself.
        </p>
        <div className="social">
          <a href="https://github.com/ariafallah">
            <img src="/assets/icons/github.svg" alt="github logo" />
          </a>
          <a href="http://stackoverflow.com/users/3772221">
            <img
              src="/assets/icons/stackexchange.svg"
              alt="stackoverflow logo"
            />
          </a>
          <a href="https://linkedin.com/in/ariafallah">
            <img src="/assets/icons/linkedin.svg" alt="linkedin logo" />
          </a>
          <a href="https://aria.ai/">
            <img src="/assets/icons/logo.svg" alt="my logo" />
          </a>
          <a href="https://facebook.com/m0meni">
            <img src="/assets/icons/facebook.svg" alt="facebook logo" />
          </a>
          <a href="https://instagram.com/m0meni">
            <img src="/assets/icons/instagram.svg" alt="instagram logo" />
          </a>
          <a href="https://twitter.com/m0meni">
            <img src="/assets/icons/twitter.svg" alt="twitter logo" />
          </a>
        </div>
      </Aux>
    );
  }
}

export { About };
