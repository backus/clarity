#!/bin/bash

##############################################################
###  Fail if source files contain `console.*` statements.  ###
##############################################################

! /usr/bin/grep \
  --color=always \
  --exclude-dir=node_modules \
  --exclude-dir=.git \
  --exclude-dir=coverage \
  --exclude-dir=dist \
  --exclude-dir=build \
  --exclude-dir=tasks \
  --exclude=./utils/hermes.ts \
  --exclude=./src/server/config/index.js \
  --exclude=./src/server/config/environments.ts \
  --exclude=./clarity.sublime-workspace \
  --exclude=./README.md \
  -R 'console.log\|console.warn\|console.info' .


##############################################################
###  Fail if source calls `express` outside of http utils ####
##############################################################

! /usr/bin/grep \
  --color=always \
  --exclude-dir=node_modules \
  --exclude-dir=.git \
  --exclude-dir=coverage \
  --exclude-dir=dist \
  --exclude-dir=build \
  --exclude-dir=tasks \
  --exclude=yarn.lock \
  --exclude=./utils/http/newApp.ts \
  --exclude=./package.json \
  --exclude=./yarn-error.log \
  --exclude=./README.md \
  -R 'express()\|bodyParser' .
