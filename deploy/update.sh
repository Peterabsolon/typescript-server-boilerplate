#!/bin/bash

set -e

env

python /usr/local/service_account_ssh.py \
    --cmd "cd /usr/local && docker-compose down && DRONE_BUILD_NUMBER=${DRONE_BUILD_NUMBER} docker-compose up -d" \
    --account ssh-master-account@mvp-api-254102.iam.gserviceaccount.com \
    --project mvp-api-254102 --hostname $HOSTNAME
