#!/bin/bash

set -e

cd generator
curl -o- -L https://yarnpkg.com/install.sh | bash
yarn install
yarn build
node dist/index.js