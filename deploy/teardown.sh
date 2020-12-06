#!/bin/bash

# Todo: run backup.sh before

gcloud compute instances delete "efforts-api"

echo "teardown success"
