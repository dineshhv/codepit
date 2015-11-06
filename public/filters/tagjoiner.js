angular.module('tagjoiner', [])
    .filter('joinBy', function () {
        return function (input,delimiter) {
            return (input || []).join(delimiter || ',');
        };
    });