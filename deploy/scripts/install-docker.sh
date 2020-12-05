#!/bin/bash

# Update package manager
sudo apt-get update -y

# Install required packages for Docker
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common iptables

# Add Docker’s official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# Add Docker repository
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

# Install Docker
sudo apt-get install -y docker-ce
sudo apt-get install -y docker-ce-cli
sudo apt-get install -y docker-compose
sudo apt-get install -y containerd.io

# Add user to docker grp (to run docker commands without sudo)
sudo usermod -aG docker $USER
