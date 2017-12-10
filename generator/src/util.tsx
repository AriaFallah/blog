import * as React from 'react';
import * as util from 'util';
import { minify } from 'html-minifier';
import { Helmet } from 'react-helmet';
import { renderToStaticMarkup } from 'react-dom/server';
import { Site } from './template/Site';

export const Aux: any = ({ children }: any) => children;

export function makePage(pageContent: React.ReactElement<any>): string {
  const body = renderToStaticMarkup(<Site>{pageContent}</Site>);
  const helmet = Helmet.renderStatic();
  const html = `
  <!doctype html>
  <html lang="en">
    <head>
      ${helmet.title.toString()}
      <meta charset="utf-8" />
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      <link rel="stylesheet" href="/assets/standard.css" />
      <link rel="stylesheet" href="/assets/index.css" />
    </head>
    <body ${helmet.bodyAttributes.toString()}>
      ${body}
    </body>
  </html>`;

  return minify(html, { collapseWhitespace: true });
}
