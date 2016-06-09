FROM ar14/ghost
MAINTAINER aria@fallah.us

COPY disqus.html hljs.html /

RUN sed -i '/{{ghost_head}}/r /hljs.html' /usr/src/app/content/themes/casper/default.hbs \
    && sed -i '/<\/footer>/r /disqus.html' /usr/src/app/content/themes/casper/post.hbs \
    && rm /disqus.html /hljs.html
