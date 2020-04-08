#!/usr/bin/env bash

shopt -s nocasematch
set -e
set -o pipefail

set_env() {
  export OWNER="clubmed"
  export MASTER_BRANCH="master"
  export PRODUCTION_BRANCH="production"
  export PRODUCTION_CANDIDATE_FLAG="[MEP]"

  if [ -n "$GIT_USER_EMAIL" ] && [ -n "$GIT_USER_NAME" ]; then
    echo "Configure git with username" ${GIT_USER_NAME} "and email" ${GIT_USER_EMAIL}
    git config --global user.name ${GIT_USER_NAME}
    git config --global user.email ${GIT_USER_EMAIL}
  else
    echo ERROR:"Ignore git configuration (Empty GIT_USER_EMAIL or/and GIT_USER_NAME variables)"
    exit 1
  fi
}
