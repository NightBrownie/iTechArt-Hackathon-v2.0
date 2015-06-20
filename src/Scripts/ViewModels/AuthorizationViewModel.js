(function() {
    'use strict';

    function AuthorizationViewModel() {
        var self = {};

        self.isAuthorizationViewModelEnabled = ko.observable(false);

        self.ShowForm = function() {
            self.isAuthorizationViewModelEnabled(!self.isAuthorizationViewModelEnabled());
        };

        return self;
    }

    window.ViewModels.AuthorizationViewModel = AuthorizationViewModel;
})();
