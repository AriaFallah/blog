import * as React from 'react';
import { Helmet } from 'react-helmet';
import { PostHeader } from './PostHeader';
import { Aux } from '../util';

type Props = {
  posts: Post[];
};

class Home extends React.Component<Props> {
  render() {
    const posts = this.props.posts.slice();
    return (
      <Aux>
        <Helmet>
          <title>Aria</title>
        </Helmet>
        {posts
          .sort((a, b) => {
            const aDate = new Date(a.frontMatter.date);
            const bDate = new Date(b.frontMatter.date);
            return bDate.getTime() - aDate.getTime();
          })
          .map(p => (
            <section className="article-preview" key={p.frontMatter.title}>
              <PostHeader frontMatter={p.frontMatter} />
              <div>
                <article dangerouslySetInnerHTML={{ __html: p.excerpt }} />
                <a href={`/posts/${p.frontMatter.slug}.html`}>Keep reading</a>
              </div>
            </section>
          ))}
      </Aux>
    );
  }
}

export { Home };
