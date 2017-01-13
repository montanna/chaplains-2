var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname));

// views is directory for all template files
app.set('views', __dirname);
app.set('view engine', 'html');

app.get('/', function(request, response) {
    response.render('index');
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

var firebase = require("firebase");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAKypRvUnUzE6XmUIXCOIe4Al2x2Xd593s",
    authDomain: "chaplains-63a1a.firebaseapp.com",
    databaseURL: "https://chaplains-63a1a.firebaseio.com",
    storageBucket: "chaplains-63a1a.appspot.com",
    messagingSenderId: "776082682108"
};
firebase.initializeApp(config);
