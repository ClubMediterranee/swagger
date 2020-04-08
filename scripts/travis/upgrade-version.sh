#!/usr/bin/env bash

shopt -s nocasematch
set -e
set -o pipefail

upgrade_version() {
  git checkout production
  git branch --set-upstream-to=origin/production production

  CURRENT_VERSION=$(node -p -e "require('./lerna.json').version")

  lerna version --conventional-commits --exact --yes --no-git-tag-version --no-push

  VERSION=$(node -p -e "require('./lerna.json').version")

  echo "Current version: ${CURRENT_VERSION}"
  echo "Calculated version: ${VERSION}"

  if [[ ${VERSION} == ${CURRENT_VERSION} ]]; then
    echo "Force version"
    VERSION=`semver ${CURRENT_VERSION} -i patch`

    lerna version ${VERSION} --force-publish --conventional-commits --exact --yes --no-git-tag-version --no-push

    VERSION=$(node -p -e "require('./lerna.json').version")
  fi

   echo "New version: ${VERSION}"

  yarn version --no-git-tag-version --new-version ${VERSION}
}
