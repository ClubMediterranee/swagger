#!/usr/bin/env bash

shopt -s nocasematch
set -e
set -o pipefail

create_release() {
    CI_SKIP="[ci skip]"

    upgrade_version

    yarn generate:changelog

    display_release_info

    yarn build
    cp -R dist/latest dist/${VERSION}

    git add ./dist/** -f -A
    git add .
    git reset -- .npmrc

    git status

    git commit -m "${RELEASE_MESSAGE} - ${CI_SKIP}"
    git push https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG} ${TRAVIS_BRANCH}
    git tag ${RELEASE_TAG} -a -m "Version ${RELEASE_TAG}"
    git push https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG} ${RELEASE_TAG}
    git push -f https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG} production:refs/heads/master

    cd dist
    touch .nojekyll
    git init
    git add -A
    git commit -m "Deploy assets v${RELEASE_VERSION}"
    git push -f https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG} master:gh-pages
    cd ..
}
