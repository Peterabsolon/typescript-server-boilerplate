#!/bin/bash

# Create swap file
sudo fallocate -l 2G /swapfile

# Setup read/write perms for root user
sudo chmod 600 /swapfile

# Setup swap file
sudo mkswap /swapfile

# Activete swap file
sudo swapon /swapfile

# Make activation permanent
sudo bash -c 'echo "/swapfile swap swap defaults 0 0" >> /etc/fstab'
