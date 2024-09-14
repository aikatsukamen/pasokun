sudo chown vscode:vscode node_modules
sudo chown vscode:vscode data
sqlite3 ./data/database.sqlite < ./src/database/init.sql

# app package install
npm install

sed -i s/large-v1/large-v3/g  node_modules/whisper-node/dist/download.js
sed -i s/large-v1/large-v3/g  node_modules/whisper-node/dist/whisper.js

expect -c "
set timeout 3
spawn npx whisper-node download
expect \"(ENTER for base.en):\"
send \"large-v3\n\"
interact
"

npx puppeteer browsers install chrome
 