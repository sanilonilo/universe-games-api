#!/sh
if [ $1 = 'prod'];then
    export $(grep -v '^#' .env | xargs)
else export $(grep -v '^#' .env.dev | xargs)   
fi 

npm start
