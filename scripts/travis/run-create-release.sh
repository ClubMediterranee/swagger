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
### Prepare release infos
###################################################################################################

if [ -n "$UPDATE_DEP_MESSAGE" ]; then
  RELEASE_MESSAGE="$UPDATE_DEP_MESSAGE"
else
  RELEASE_MESSAGE="$(git log --first-parent --format=%B -n 1)"
fi

###################################################################################################
### Commit release and push tag on github
###################################################################################################

if [[ ${TRAVIS_BRANCH} == ${PRODUCTION_BRANCH} ]]; then
  create_release
else
  LAST_COMMIT_MSG=$(git log -1 --pretty=%B)

  if [[ $LAST_COMMIT_MSG == *"$PRODUCTION_CANDIDATE_FLAG"* ]]; then
    mep_feature_branch
  else
    echo "It's not there!"
  fi
fi
