#!/usr/bin/env bash

shopt -s nocasematch
set -e
set -o pipefail

display_release_info() {
    RELEASE_VERSION=$(node -p -e "require('./lerna.json').version")

    if [[ ${TRAVIS_BRANCH} != ${PRODUCTION_BRANCH} ]]; then

      SHORT_HASH="$(git rev-parse --short ${TRAVIS_COMMIT})"
      RELEASE_VERSION=${RELEASE_VERSION}-beta${SHORT_HASH}
    fi

    RELEASE_TAG="v${RELEASE_VERSION}"
    RELEASE_MESSAGE=$(echo ${RELEASE_MESSAGE} | sed ':a;N;$!ba;s/\n/ /g')

    echo "-----------------------------------"
    echo "--- Release info"
    echo "-----------------------------------"
    echo "Version   :" ${RELEASE_VERSION}
    echo "Tag       :" ${RELEASE_TAG}
    echo "Message   :" ${RELEASE_MESSAGE}
}
