#!/bin/sh

# Build client
cd /home/huon/WebstormProjects/folio/client
npm run build

# Copy files to folder
mkdir /home/huon/Desktop/server
mkdir /home/huon/Desktop/server/public

rsync -a ~/WebstormProjects/folio/client/dist/* ~/Desktop/server/public/
rsync -a --exclude=node_modules --exclude=folio-backup.sqlite ~/WebstormProjects/folio/server/* ~/Desktop/server/

# Zip and remove server folder
cd ~/Desktop
tar -cf server.tar.gz server
rm -r server

# remove old files from the server
# ssh omen@omenmc.hopto.org -p 2024 "rm ~/server.tar.gz"
# rm -r ~/server
# rm ~/server.tar.gz
# exit

# Copy to the server
# scp -P 2024 ~/Desktop/server.tar.gz omen@omenmc.hopto.org:/home/omen

# ssh omen@omenmc.hopto.org -p 2024
# cd ~
# tar -xf server.tar.gz
# exit

