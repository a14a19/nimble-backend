# Nimble Backend

### To get started -

1. created a .env file in root and copy paste all the variables from .env.example and add the appropriate values to them
2. node src/seeds/admin.js or npm run admin
3. node src/seeds/userTraits.js or npm run traits
4. run - npm i;
5. run - npm run dev;

#### Follow the guide to expose your local host (http) to secure network (https) for using the api in React Native for iOS -

1. Follow the link[https://dashboard.ngrok.com/get-started/setup/windows] and install ngrok on your system
2. run - ngrok -v, to check if ngrok is installed or not
3. run - npm run ngrok_window --port={{LOCAL_PORT_NUMBER}}
