#! /bin/bash

if [ $# -ne 3 ] ; then 
  echo "Usage: $0 repository user password" 
  exit
fi

REPO=$1
USER=$2
PWD=$3

REPO=https://$USER:$PWD@${REPO#https://}

cd /data
mkdir assets
cd assets
git init
git remote add origin $REPO
git config core.sparsecheckout true
echo "src/themes/default/assets" >> .git/info/sparse-checkout
git pull --depth=1 origin master
