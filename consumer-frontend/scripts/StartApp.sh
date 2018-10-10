#! /bin/bash

if [ $# -ne 1 ] ; then
  echo "Usage: $0 path-to-context"
  echo "Example: $0 /home/jelastic/ROOT"
  exit
fi

PATH_TO_CONTEXT=$1

cd $PATH_TO_CONTEXT
yarn
yarn build
yarn start
