---
date: 2017-05-24
description: "A quick tutorial on making a CLI app with Node.js"
slug: making-a-node-cli-application
title: Making a Node.js CLI Application
---

I recently took the time to throw [napjs](https://github.com/AriaFallah/napjs)
together in a few minutes, which is a very simple CLI alarm clock. This is a
quick write up on how I did that.

<!--more-->

### The basics

To make any old `node.js` script a CLI tool you need to do only two things.

**1\.** In your `package.json` file, you're going to add in the `bin` key, which
for `napjs` looks like

```diff
{
  "name": "napjs",
  "version": "1.0.0",
  "description": "CLI Alarm Clock",
+  "bin": {
+    "napjs": "./index.js"
+  },
  "author": "Aria Fallah",
  "license": "MIT",
  "dependencies": {
    "minimist": "^1.2.0",
    "ora": "^1.2.0",
    "say": "^0.11.0"
  }
}
```

the `"napjs"` key specifies that I want my binary to be called `napjs`, and the
value `./index.js` specifies the path to the node script I want to be run. Now,
if someone does a

```bash
npm install -g napjs
```

they'll get a binary called `napjs` added to `/usr/local/bin`.

**2\.** At the top of your file you're going to add a
[shebang](<https://en.wikipedia.org/wiki/Shebang_(Unix)>), which specifies that
the script is meant to be run with node

```js
#!/usr/bin/env node

// Your code
console.log('wow great script');
```

### The essentials

At the very least, you're going to need a command line arguments parser. There
are many options, but in the interests of keeping it simple, I used
[minimist](https://github.com/substack/minimist). The only other optional thing
you might to use is a command line spinner, which
[ora](https://github.com/sindresorhus/ora) is great for.

### The code

Putting it all together, I'll just go over
[napjs](https://github.com/AriaFallah/napjs), which is only 26 lines long
(without comments)

```js
#!/usr/bin/env node
// The above shebang lets us run this script
// without having to put "node" in front which is
// necessary for any script that you want to be a CLI tool

const say = require('say'); // This is the text to speech package
const ora = require('ora'); // CLI spinner mentioned above
const m = require('minimist'); // CLI argument parser mentioned above

// We parse the command line arguments using minimist
const argv = m(process.argv.slice(2));

// We make sure that they specified a time
if (!argv.t || argv.t === true) {
  console.log('Need to provide -t flag specifying time!');
  process.exit(1);
}

// Then we set up the alarm using the args
alarm(argv.t, argv.m || 'wake up');

function alarm(time, message) {
  // I don't like mutating function arguments
  // directly so I copy time into a local variable
  let timer = time;

  // We start the spinner with the initial amount of time
  const spinner = ora(`${timer}s`).start();

  // Every second, we decrement the
  // amount of time the spinner shows by one second
  const countDown = setInterval(() => (spinner.text = `${--timer}s`), 1000);

  // We wait for the amount of time
  // specified before setting off the alarm
  setTimeout(function() {
    // We set the interval of the
    // message to be based on its length
    // so text-to-speech doesn't overlap with itself
    const messageInterval = Math.ceil(message.length / 10) * 1000;

    // We clear the countdown since we don't need it anymore
    clearInterval(countDown);

    // We set the spinner to the message
    spinner.text = message.toUpperCase();

    // And we say the message on an interval,
    // which we never clear because we want
    // the person to actually Ctrl-C out of it
    setInterval(() => say.speak(message), messageInterval);
  }, time * 1000);
}
```

### Conclusion

I don't think [napjs](https://github.com/AriaFallah/napjs) is really all that
useful, but the main take away here is how easy it is to make and distribute CLI
scripts using `node.js`.
