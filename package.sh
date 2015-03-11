#!/bin/sh

rm -f ColourNTP.zip
rm -rf ./temp
mkdir -p ./temp
rsync -aP --exclude '.git*' --exclude LICENSE --exclude README.md --exclude package.sh --exclude '*.scss' --exclude '*.css.map' --exclude temp . ./temp
cd ./temp
zip -r ColourNTP.zip *
mv ./ColourNTP.zip ../ColourNTP.zip
cd ../
rm -rf ./temp
