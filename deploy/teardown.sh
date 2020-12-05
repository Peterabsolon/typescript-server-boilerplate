#!/bin/bash

# Todo: run backup.sh before

gcloud compute instances delete "mvp-api"

echo "teardown success"