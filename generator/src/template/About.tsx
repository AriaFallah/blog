import * as React from 'react';
import { Helmet } from 'react-helmet';
import { PostHeader } from './PostHeader';
import { Aux } from '../util';

class About extends React.Component {
  render() {
    return (
      <Aux>
        <h2>About me</h2>
        <p>
          Hi, my name is <a href="https://www.aria.ai">Aria Fallah</a>. I'm
          currently a senior at UMBC majoring in Computer Science and minoring
          in Mathematics. I work as a Software Engineering Intern at FiscalNote,
          and this summer I'm excited to be starting a position at Facebook as a
          Software Engineer. In my free time, I like to work on{' '}
          <a href="https://www.github.com/AriaFallah">side projects</a>,{' '}
          <a href="https://www.instagram.com/m0meni">take pictures</a>, and
          exercise.
        </p>
      </Aux>
    );
  }
}

export { About };
