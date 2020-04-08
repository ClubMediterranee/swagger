#!/usr/bin/env bash

shopt -s nocasematch
set -e
set -o pipefail

create_release() {
    CI_SKIP="[ci skip]"

    upgrade_version

    yarn generate:changelog
    git add .
    git add ./dist -f
    git reset -- .npmrc

    display_release_info

    git commit -m "${RELEASE_MESSAGE} - ${CI_SKIP}"
    git push origin ${TRAVIS_BRANCH}
    git tag ${RELEASE_TAG} -a -m "Version ${RELEASE_TAG}"
    git push origin ${RELEASE_TAG}
    git push -f origin production:refs/heads/master
}
