#!/bin/bash

# Todo: run backup.sh before

gcloud compute instances delete "typescript-server-boilerplate"

echo "teardown success"
