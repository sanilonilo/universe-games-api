#!/sh
if [[$1 = 'dev']];then
    export $(grep -v '^#' .env.dev | xargs)
else export $(grep -v '^#' .env | xargs)   
fi 

npm start
