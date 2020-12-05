#!/bin/bash

INSTANCE_NAME="typescript-server-boilerplate"
ZONE="europe-west3-a"
SERVICE_ACCOUNT="ssh-master-account@mvp-api-254102.iam.gserviceaccount.com"

function run_script {
  gcloud compute scp --zone=$ZONE ./scripts/$1 $INSTANCE_NAME:~/
  gcloud compute ssh $INSTANCE_NAME --zone=$ZONE --command="sudo chmod +x -R ~/${1}"
  gcloud compute ssh $INSTANCE_NAME --zone=$ZONE --command="~/${1}"
}

# Create instance
gcloud compute instances create $INSTANCE_NAME \
    --image "ubuntu-1804-bionic-v20200923" \
    --image-project "ubuntu-os-cloud" \
    --machine-type "f1-micro" \
    --zone $ZONE \
    --boot-disk-size "10" \
    --boot-disk-type "pd-standard" \
    --metadata=enable-oslogin="TRUE" \
    --tags "http,https,pg-5432" \
    --network "public"

# Enable access to instance with master service account
gcloud compute instances add-iam-policy-binding $INSTANCE_NAME \
    --zone $ZONE \
    --member serviceAccount:$SERVICE_ACCOUNT \
    --role roles/compute.osAdminLogin

# Await instance boostrap
sleep 60

# Install deps
run_script setup-swap.sh
run_script install-stackdriver-monitoring.sh
run_script install-docker.sh

# Deploy
gcloud compute scp --recurse ./files/ $INSTANCE_NAME:~/
gcloud compute ssh $INSTANCE_NAME --command="shopt -s dotglob && mv ~/files/* ~/"

# Run
gcloud compute ssh $INSTANCE_NAME --command="docker-compose up -d"

echo "bootstrap success"
