#!/bin/bash
set -eo pipefail

# We have to put this in a separate file as the pipeline
# command needs to be static, and this env var breaks that.
docker build --pull -f "$DOCKERFILE_PATH" -t ci_build_test_image --build-arg CODEFLOW_COMMIT_TAG .

# Cleanup after a successful build to avoid the agent
# running out of disk space!
docker image rm -f ci_build_test_image