(function() {
    'use strict';

    function AuthorizationViewModel() {
        var self = {};
        self.isUserLoggedIn = ko.observable(false);
        self.userName = ko.observable();
        self.password = ko.observable();

        self.lastName = ko.observable();
        self.firstName = ko.observable();

        self.confirmPassword = ko.observable();

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
                var test = returnedData;
                self.isUserLoggedIn(true);
            });
        };

        self.LogOut = function () {
            $.post("/api/user/logout", function (returnedData) {
                var test = returnedData;
                self.isUserLoggedIn(false);
            });
        };

        return self;
    }

    
    window.ViewModels.AuthorizationViewModel = AuthorizationViewModel;
})();
