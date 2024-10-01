SCREEN_NAME="cs"
cd /home/jun/COLDSWORD
screen -dmSU $SCREEN_NAME node --env-file=.env index.js
