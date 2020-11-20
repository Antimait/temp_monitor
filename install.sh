#! /usr/bin/env bash

curl -fsSL https://get.docker.com -o get-docker.sh
chmod +x get-docker.sh
source ./get-docker.sh

sudo usermod -a -G docker $USER
apt-get install build-essential libssl-dev libffi-dev python-dev
pip3 install docker-compose

docker-compose up -d
