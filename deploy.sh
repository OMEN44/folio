#!/bin/sh

# Build project
cd ~/Programs/WebApps/folio
echo "deployment=true" > .env
npm run build
mkdir -p server_files
rm -r server_files/*
# Transfer files
rsync -a dist server_files
rsync -a ~/Programs/WebApps/folio/package.json ~/Programs/WebApps/folio/server_files
rsync -a ~/Programs/WebApps/folio/*config* ~/Programs/WebApps/folio/server_files
echo Web server files built in directory ~/Programs/WebApps/folio/server_files

case "$1" in
    prod|production)
        echo "Deployment"
        ;;
    *)
        echo "Deploying to beta..."
        rsync -azh -e "ssh -p 2024" --remove-source-files server_files omen@huon.dev:/home/omen/beta/temp
        ssh omen@huon.dev -p 2024 './beta/remove_files.sh'
    ;;
esac

echo "deployment=false" > .env

echo Finished!