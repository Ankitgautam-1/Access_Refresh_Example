## Client

npm i
npm run build
npm run preview

## Server

npm i
npm run build  
npm run start

# ENV - SERVER

PORT= port to run server.
MONGO_URL= your mongo db connection url.
FRONTEND_URL= frontend to allow in cors.
SECRECT_KEY_ACCESS= secrect key for creating and verifying accessToken.
SECRECT_KEY_REFRESH= secrect key for creating and verifying refreshToken.
ACCESS_TOKEN_EXPIRES= number of hours the accessToken will be valide for.
REFRESH_TOKEN_EXPIRES= number of days the refreshToken will be valide for.
