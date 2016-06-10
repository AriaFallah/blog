#!/bin/bash

set -e

compose=/usr/local/aria.ai/blog/docker-compose.yml

certbot-auto renew \
  --standalone \
  --pre-hook "docker-compose -f ${compose} stop" \
  --post-hook "docker-compose -f ${compose} start"
