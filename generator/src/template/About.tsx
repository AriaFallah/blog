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
          Hi, my name is <a href="https://www.aria.ai">Aria Fallah</a>. I'm
          currently a senior at UMBC majoring in Computer Science and minoring
          in Mathematics. I work as a Software Engineering Intern at FiscalNote,
          and this summer I'm excited to be starting at Facebook as a Software
          Engineer. In my free time, I like to work on{' '}
          <a href="https://www.github.com/AriaFallah">side projects</a>,{' '}
          <a href="https://www.instagram.com/m0meni">take pictures</a>, and
          exercise.
        </p>
        <p>
          This blog is{' '}
          <a href="https://www.github.com/AriaFallah/blog">open source</a>, and
          is generated using a{' '}
          <a href="https://github.com/AriaFallah/blog/tree/master/generator">
            static site generator
          </a>{' '}
          that I wrote myself. I figured it'd be cool to make my own generator,
          and it worked out pretty well.
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
