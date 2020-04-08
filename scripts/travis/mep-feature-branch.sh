#!/usr/bin/env bash

shopt -s nocasematch
set -e
set -o pipefail

mep_feature_branch() {
  display_release_info

  echo "Branch $(echo $FEATURE_BRANCH) is candidate to MEP"
  git config --replace-all remote.origin.fetch +refs/heads/*:refs/remotes/origin/*

  git add package.json
  git add yarn.lock
  git commit --amend --no-edit

  echo "Checkout production branch"
  git fetch --unshallow --tags || git fetch --tags || true
  git checkout -b ${PRODUCTION_BRANCH} --track origin/${PRODUCTION_BRANCH}

  building=$(git log -1 --pretty=%B)

  if [[ $building != *"[ci skip]"* ]]; then
    echo 'A build is already ongoing, stopping, check Travis build status'
    exit 1
  fi

  echo "Merge $TRAVIS_BRANCH into production"
  git merge --no-ff -m "$(echo $TRAVIS_BRANCH)" ${TRAVIS_BRANCH}

  echo "Push production"
  git push origin ${PRODUCTION_BRANCH}

  echo "Reset HEAD of origin/master branch to HEAD of origin/production"
  git push -f origin refs/remotes/origin/${PRODUCTION_BRANCH}:refs/heads/${MASTER_BRANCH}

  echo "Remove origin/$TRAVIS_BRANCH branch"
  git push origin :${TRAVIS_BRANCH}
}
