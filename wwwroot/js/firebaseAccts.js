// this is a namespace, designed to prevent variable names from
// stepping on each other. Means we can more easily drop this
// same feature into other websites.


// the module pattern is a better way to create a namespace
var firebaseFuncsNew = (function() {
    var self = {};
    // private variables
    self.ref = new Firebase("https://luminous-torch-1468.firebaseio.com/");
    var debugMode=true;

    self.getName = function(authData) {
        switch (authData.provider || "none") {
        case 'password':
            return authData.password.email.replace(/@.*/, '');
        case 'twitter':
            return authData.twitter.displayName;
        case 'facebook':
            return authData.facebook.displayName;
        }
    };

    
    // use this to test if a user is logged in.
    // example: path = logData/supportBlue/test, expectedValue = "loggedIn"

    self.testLogin = function (path,expectedValue,success,failure) {
        self.ref.child(path).once("value", function(snapshot) {
            data = snapshot.val()
            if(data) {
                success();
            } else {
                failure();
            }
        })
    };

    // create new accounts
    self.createAccount = function(email, password, success, failure) {
        self.ref.createUser({
            email: email,
            password: password
        }, function(error, authData) {
            if (error) {
                failure(error);
            } else {
               self.ref.child("logData/supportBlue/users").child(authData.uid).set({
                    provider: authData.provider || "provider",
                    name: self.getName(authData) || "name"
               });
                success(authData.uid);
            }
        });
    };

    //save registrant
    self.saveRegistrant = function (email, first, last) {
        self.ref.child('logData/supportBlue/registrants/identities/' + email.replace(/\./g, "_dot_")).update(
        {
            first: first,
            last: last
        });
    };

    // log user attempts to login
    self.logUser = function(email, password,date,string) {
        self.ref.child('logData/supportBlue/registrants/history').push(
        {   date: window.moment(new Date()).format("MM/DD/YYYY HH:mm:ss"),
            username: email,
            string: string
        });
    };

    //log users in
    self.loginUsers = function (email, password, success, failure) {
        self.ref.authWithPassword({
            email: email,
            password: password
        }, function (error, authData) {
            if (error) {
                failure(error);
            } else {
                self.ref.child('logData/supportBlue/users').child(authData.uid).update(
                { provider: authData.provider,
                    name: self.getName(authData),
                    "screenSize": {
                        "pageWidth": $(document).width(),
                        "pageHeight": $(document).height(),
                        "screenHeight": screen.height,
                        "screenWidth": screen.width,
                        "viewportWidth": $(window).width(),
                        "viewportHeight": $(window).height()
                    }
                });
                success(authData);
            }
        });
    };

    // changing emails
    self.changeUserEmail = function (oldEmail, newEmail, password, success, failure) {
        self.ref.changeEmail({
            oldEmail: oldEmail,
            newEmail: newEmail,
            password: password
        }, function (error) {
            if (error === null) {
                success(true);
            } else {
                failure(error);
            }
        });
    };

    // changing passwords
    self.changeUserPassword = function(email, oldPassword, newPassword, success, failure) {
        self.ref.changePassword({
            email: email,
            oldPassword: oldPassword,
            newPassword: newPassword
        }, function(error) {
            if (error === null) {
                success(true);
            } else {
                failure(error);
            }
        });
    };

    //send password reset emails
    self.resetUserPassword = function(email, success, failure) {
        self.ref.resetPassword({
            email: email
        }, function(error) {
            if (error === null) {
                success(true);
            } else {
                failure(error);
            }
        });
    };

    //deleting users
    self.deleteUser = function(email, password, success, failure) {
        self.ref.removeUser({
            email: email,
            password: password
        }, function(error) {
            if (error === null) {
                success(true);
            } else {
                failure(error);
            }
        });
    };

    //auto connect user
    self.autoConnectUser = function (username, password, success, failure) {
        firebaseFuncs.loginUsers(username, password,
            // success
                success,
            // failure
            function (error) {
                console.log("autoconn: first login failure");
                // was the error due to a non-existent user?
                if (error.code === "INVALID_USER") {
                    // in that case, create the account
                    firebaseFuncs.createAccount(username, password,
                        // did the create account succeed? then login
                        function () {
                            firebaseFuncs.loginUsers(username, password, success,
                                // did the create account fail?
                                function (error) {
                                    console.log("autoconn: create user failure");
                                    console.log(JSON.stringify(error));
                                    failure(error);
                                }
                            );
                            // create user failure
                        }, failure(error));
                } else // code wasn't an invalid user; therefore, was probably wrong password
                {
                    console.log(JSON.stringify(error));
                    failure(error);
                }
            });
    }; // end autoConnectUser

    return self;
}(window,jQuery));


