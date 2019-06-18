# Narrow

Open source project management app enabling collaboration between multiple people.

## Tech Stack

Backend is written in Django, [see it here](https://github.com/MaksymilianDemitraszek/Narrow).

Mobile is written using React Native with Redux store, Sagas and Axios handling user calls and redux-persist for store persistence.
UI is developed using React Native Elements as well as React Native Raw Action Sheet.

## How to run it

Firstly install all needed dependencies with ```npm install``` then install React Native CLI using ```npm install -g react-native-cli```

If you want to run the app, you also have to set up [this Django server](https://github.com/MaksymilianDemitraszek/Narrow), most recent version of which is on developement branch. You can do this by installing python3 and pip, then 
```
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

Then tunnel it to outside world using ngrok or something simillar and exchange the value of BASE_URL variable in ./src/helpers/api-helper.js

If you want to run the tests, you can run unit/integration tests with ```npm test```, E2E tests are written using Detox, to launch them follow the tutorial [here](https://github.com/wix/Detox/blob/master/docs/Introduction.Android.md)

Linting is made using prettier and eslint with airbnb config, if you want to run it use ```npm run lint```.
