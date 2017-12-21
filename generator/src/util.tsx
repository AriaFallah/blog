import * as React from 'react';
import * as util from 'util';
import { minify } from 'html-minifier';
import { Helmet } from 'react-helmet';
import { renderToStaticMarkup } from 'react-dom/server';
import { Site } from './template/Site';

export const Aux: any = ({ children }: any) => children;

export function makePage(
  pageContent: React.ReactElement<any>,
  css: string
): string {
  const body = renderToStaticMarkup(<Site>{pageContent}</Site>);
  const helmet = Helmet.renderStatic();
  const html = `
  <!doctype html>
  <html lang="en">
    <head>
      ${helmet.title.toString()}
      <meta charset="utf-8" />
      ${helmet.meta.toString()}
      <style>
        ${css}
      </style>
    </head>
    <body ${helmet.bodyAttributes.toString()}>
      ${body}

      <noscript id="deferred-styles">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Serif+Pro">
        ${helmet.link.toString()}
      </noscript>
      <script>
        var loadDeferredStyles = function () {
          var addStylesNode = document.getElementById("deferred-styles");
          var replacement = document.createElement("div");
          replacement.innerHTML = addStylesNode.textContent;
          document.body.appendChild(replacement)
          addStylesNode.parentElement.removeChild(addStylesNode);
        };
        var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
          window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        if (raf) raf(function () { window.setTimeout(loadDeferredStyles, 0); });
        else window.addEventListener('load', loadDeferredStyles);
      </script>
      
      <!-- Global site tag (gtag.js) - Google Analytics -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-79031036-1"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-79031036-1');
      </script>
    </body>
  </html>`;

  return minify(html, { collapseWhitespace: true });
}
