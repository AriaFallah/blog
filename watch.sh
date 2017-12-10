#!/bin/bash

set -e

echo building ts && tsc -p ./generator
node generator/dist/index.js

chokidar './generator/src/**/*' -c 'echo building ts && tsc -p ./generator' &
PID1=$!
chokidar './blog/**/*' './generator/dist/*' -c 'node generator/dist/index.js' &
PID2=$!

read -p $'Press enter to stop watching\n'

kill "$PID1"
kill "$PID2"
