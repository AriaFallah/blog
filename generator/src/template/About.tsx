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
          that I wrote myself. Why? I used to use Hugo, but it had too many
          features I didn't need, and didn't have a lot of features I wanted. I
          then was going to switch to GatsbyJS from Hugo, but it had similar
          problems. I figured why not write my own, and it worked out pretty
          well.
        </p>
        <p>
          Check out the <a href="https://www.aria.ai">main site</a> if you want
          to learn more.
        </p>
      </Aux>
    );
  }
}

export { About };
