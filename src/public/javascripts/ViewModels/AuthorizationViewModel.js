(function() {
    'use strict';

    function AuthorizationViewModel() {
        var self = {};

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
            });
        };

        self.register = function () {
            var data = {
                "username": self.userName(),
                "password": self.password()
            };
            $.post("/api/user/register", data, function (returnedData) {
                var test = returnedData;
            });
        };

        return self;
    }

    window.ViewModels.AuthorizationViewModel = AuthorizationViewModel;
})();
