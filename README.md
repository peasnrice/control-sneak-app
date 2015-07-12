# control-sneak-app

##Get Dependencies
###Node
Install node.js, installers can be found here:[Get Node](https://nodejs.org/download/)

###Install Cordova & Ionic Frameworks
`sudo npm install -g cordova ionic`

###Install Dependencies
from within the application directory run:

`npm install`

###install some fancy plugins and dependencies
This plugin will allow you to login using facebook oauth using the facebook apps dev app.

`cordova plugin add https://github.com/Wizcorp/phonegap-facebook-plugin.git --variable APP_ID="1678602979038851" --variable APP_NAME="ControlSneak - dev"`

##Prepare & Run Project
`ionic platform add ios`

`ionic build ios`

`ionic emulate ios`

