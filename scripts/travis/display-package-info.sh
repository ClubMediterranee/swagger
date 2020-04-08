#!/usr/bin/env bash

shopt -s nocasematch
set -e
set -o pipefail

display_package_info() {
  NPM_PACKAGE_NAME=$(node -p -e "require('./package.json').name")
  NPM_PACKAGE_VERSION=$(node -p -e "require('./lerna.json').version")

  echo "-----------------------------------"
  echo "--- Package info"
  echo "-----------------------------------"
  echo "Name    : " ${NPM_PACKAGE_NAME}
  echo "Version : " ${NPM_PACKAGE_VERSION}
  echo "Branch  : " ${TRAVIS_BRANCH}
}
