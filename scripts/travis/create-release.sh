#!/usr/bin/env bash

shopt -s nocasematch
set -e
set -o pipefail

create_release() {
    CI_SKIP="[ci skip]"

    upgrade_version

    yarn generate:changelog

    display_release_info

    # Build versionned app
    export BASE_URL="https://clubmediterranee.github.io/swagger/${VERSION}"

    rm -rf cp -R dist/latest
    # Build latest app
    yarn build
    cp -R dist/latest "dist/${VERSION}"
    rm -rf cp -R dist/latest
    BASE_URL="https://clubmediterranee.github.io/swagger/latest"

    yarn build

    git add ./dist/** -f -A
    git add .
    git reset -- .npmrc

    # git status

    echo "---------------------------------"
    echo "Apply release tag"
    echo "---------------------------------"

    git commit -m "${RELEASE_MESSAGE} - ${CI_SKIP}"
    git push https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG} ${TRAVIS_BRANCH}
    git tag ${RELEASE_TAG} -a -m "Version ${RELEASE_TAG}"
    git push https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG} ${RELEASE_TAG}
    git push -f https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG} production:refs/heads/master

    echo "---------------------------------"
    echo "Release GH Pages"
    echo "---------------------------------"

    cd dist
    rm -rf .git
    touch .nojekyll
    git init
    git add -A
    git commit -m "Deploy assets v${RELEASE_VERSION}"
    git push -f https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG} master:gh-pages
    cd ..
}
