#!/bin/sh

mkdir -p dist
browserify src/index.js -t es3ify -t browserify-shim -o dist/Control.Geocoder.Dawa.js
cp -r node_modules/leaflet-control-geocoder/dist .
