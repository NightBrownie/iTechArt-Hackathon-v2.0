(function() {
    'use strict';

    function AuthorizationViewModel() {
        var self = {};
        self.isUserLoggedIn = ko.observable(false);
        self.loginTabActive = ko.observable(true);

        self.userName = ko.observable();
        self.password = ko.observable();

        self.isAuthorizationViewModelEnabled = ko.observable(false);

        self.ShowForm = function() {
            self.isAuthorizationViewModelEnabled(!self.isAuthorizationViewModelEnabled());
        };

        self.logIn = function () {
            var data = {
                "username": self.userName(),
                "password": self.password()
            };
            $.post("/api/user/login", data, function(returnedData) {
                var test = returnedData;
                self.isUserLoggedIn(true);
            });
        };

        self.register = function () {
            var data = {
                "username": self.userName(),
                "password": self.password()
            };
            $.post("/api/user/register", data, function (returnedData) {
                self.isUserLoggedIn(true);
            });
        };

        self.LogOut = function () {
            $.post("/api/user/logout", function (returnedData) {
                self.isUserLoggedIn(false);
            });
        };

        self.setLoginActive = function() {
            self.loginTabActive(true);
        };

        self.setRegisterActive = function() {
            self.loginTabActive(false);
        };

        $.get('/api/user', {}, function(data) {
            if (data && data.length) {
                self.isUserLoggedIn(true);
            }
        });

        return self;
    }

    
    window.ViewModels.AuthorizationViewModel = AuthorizationViewModel;
})();
