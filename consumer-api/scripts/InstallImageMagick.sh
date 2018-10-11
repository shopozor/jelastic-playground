#! /bin/bash

if [ $# -ne 1 ] ; then
  echo "Usage: $0 path-to-imagemagick"
  exit
fi

PATH_TO_IMAGEMAGICK=$1

ARCHIVE="ImageMagick.tar.gz"
cd
mkdir build
cd build
wget http://www.imagemagick.org/download/$ARCHIVE
tar xvfz $ARCHIVE
cd ImageMagick-*
./configure --prefix=$PATH_TO_IMAGEMAGICK --enable-shared --enable-symbol-prefix
make
make install