#!/bin/sh

# Build client
cd /home/huon/WebstormProjects/folio/client
npm run build

# switch to deployment mode
sed -i 's/VITE_API_DEV=true/VITE_API_DEV=false/' .env

# Copy files to folder
mkdir /home/huon/Desktop/server
mkdir /home/huon/Desktop/server/public

rsync -a ~/WebstormProjects/folio/client/dist/* ~/Desktop/server/public/
rsync -a --exclude=node_modules --exclude=folio.sqlite --exclude=folio-backup.sqlite ~/WebstormProjects/folio/server/* ~/Desktop/server/

# Copy to server
cd ~/Desktop
ssh omen@omenmc.hopto.org -p 2024 'rm ~/server/public/assets/*'
rsync --remove-source-files -avzh -e "ssh -p 2024" server omen@omenmc.hopto.org:/home/omen

# switch to dev mode
cd /home/huon/WebstormProjects/folio/client
sed -i 's/VITE_API_DEV=false/VITE_API_DEV=true/' .env

echo Finished! Press any button to exit...
read input