#!/usr/bin/env bash

shopt -s nocasematch
set -e
set -o pipefail

source ./scripts/travis/set-env.sh
source ./scripts/travis/create-release.sh
source ./scripts/travis/deploy-docker-image.sh
source ./scripts/travis/display-release-info.sh
source ./scripts/travis/display-package-info.sh
source ./scripts/travis/mep-feature-branch.sh
source ./scripts/travis/upgrade-version.sh
