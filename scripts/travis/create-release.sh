#!/usr/bin/env bash

shopt -s nocasematch
set -e
set -o pipefail

create_release() {
    CI_SKIP="[ci skip]"

    upgrade_version

    yarn generate:changelog
    git add .
    git add ./dist/** -f
    git reset -- .npmrc

    display_release_info

    git commit -m "${RELEASE_MESSAGE} - ${CI_SKIP}"
    git push https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG} ${TRAVIS_BRANCH}
    git tag ${RELEASE_TAG} -a -m "Version ${RELEASE_TAG}"
    git push https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG} ${RELEASE_TAG}
    git push -f https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG} production:refs/heads/master
}
