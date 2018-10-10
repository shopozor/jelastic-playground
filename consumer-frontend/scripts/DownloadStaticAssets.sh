#! /bin/bash

cd /data
mkdir assets
cd assets
git init
git remote add origin https://softozor-deployer:s0ft050r@bitbucket.org/softozor/shopozor-consumer-frontend
git config core.sparsecheckout true
echo "src/themes/default/assets" >> .git/info/sparse-checkout
git pull --depth=1 origin master
