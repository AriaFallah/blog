import * as fs from 'fs-extra';
import * as path from 'path';
import * as util from 'util';
import * as MarkdownIt from 'markdown-it';
import * as yaml from 'js-yaml';
import * as React from 'react';
import { Prism } from './prism';
import { makePage } from './util';
import { Home } from './template/Home';
import { Post } from './template/Post';
import { About } from './template/About';

const md = new MarkdownIt('default', {
  html: true,
  linkify: true,
  highlight(str, lang) {
    if (!str || !lang) {
      return str;
    }

    if (!Prism.languages[lang]) {
      throw new Error(`${lang} is not supported by the highlighter!`);
    }

    const lines = Prism.highlight(str, Prism.languages[lang])
      .split(/\n/)
      .slice(0, -1);

    return lines.length > 1
      ? lines.map(s => `<span class="line-number">${s}</span>`).join('\n')
      : lines.join('\n');
  },
});

const BLOG_DIR = path.join(__dirname, '..', '..', 'blog');
const BUILD_DIR = path.join(__dirname, '..', '..', 'build');
const ASSETS_SRC_DIR = path.join(BLOG_DIR, 'assets');
const POST_SRC_DIR = path.join(BLOG_DIR, 'posts');
const ASSETS_OUT_DIR = path.join(BUILD_DIR, 'assets');
const POST_OUT_DIR = path.join(BUILD_DIR, 'posts');

const FRONT_MATTER_REGEX = /---([\s\S]*?)---\S*/;

async function main() {
  console.log('Building site...');
  fs.mkdirpSync(POST_OUT_DIR);
  fs.copySync(ASSETS_SRC_DIR, ASSETS_OUT_DIR);

  const indexCSS = fs.readFileSync(
    path.join(ASSETS_SRC_DIR, 'styles', 'index.css'),
    'utf8'
  );

  // Create post pages
  const postFiles = fs.readdirSync(POST_SRC_DIR);
  const posts = (await Promise.all(
    postFiles.map(file => fs.readFile(path.join(POST_SRC_DIR, file), 'utf8'))
  )).map((p, i) => {
    const file = postFiles[i];
    const matches = p.match(FRONT_MATTER_REGEX);
    if (matches === null) {
      throw new Error(`${file} needs to have front matter`);
    }
    const body = md.render(p.replace(FRONT_MATTER_REGEX, ''));
    const moreIndex = body.indexOf('<!--more-->');
    if (moreIndex === -1) {
      throw new Error(`${file} needs to have a <!--more--> tag`);
    }
    return {
      body: body.replace('<!--more-->', ''),
      excerpt: body.slice(0, moreIndex),
      frontMatter: yaml.safeLoad(matches[1]),
    };
  });

  // Create output paths
  const outFilePaths = [
    ...posts.map(p => path.join(POST_OUT_DIR, p.frontMatter.slug + '.html')),
    path.join(BUILD_DIR, 'index.html'),
    path.join(BUILD_DIR, 'about.html'),
  ];

  // Write pages to output paths
  const otherPages = [<Home posts={posts} />, <About />].map(p =>
    makePage(p, indexCSS)
  );
  const postPages = posts.map(p =>
    makePage(
      <Post frontMatter={p.frontMatter} postHtml={{ __html: p.body }} />,
      indexCSS
    )
  );

  await Promise.all(
    [...postPages, ...otherPages].map((page, i) =>
      fs.writeFile(outFilePaths[i], page)
    )
  );

  console.log('done!');
}

main().catch(e => console.log(e));
