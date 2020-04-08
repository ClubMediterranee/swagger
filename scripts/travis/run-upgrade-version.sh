#!/usr/bin/env bash

shopt -s nocasematch
set -e
set -o pipefail

source ./scripts/travis/import.sh

set_env

npm config set loglevel warn
npm config set git-tag-version false

###################################################################################################
### Display package infos
###################################################################################################

display_package_info

###################################################################################################
### Check if release is relevant
###################################################################################################

echo "Travis Pull Request : " ${TRAVIS_PULL_REQUEST}

if [[ ${TRAVIS_PULL_REQUEST} != 'false' ]]; then
  echo "Detect pull request. Ignore release task (Done on PR Branch)"
  exit 0
fi

###################################################################################################
### Upgrade version
###################################################################################################

if [[ ${TRAVIS_BRANCH} == ${PRODUCTION_BRANCH} ]]; then
  upgrade_version
fi
