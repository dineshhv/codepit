(function () {
	"use strict";
	var hash;
    var app=angular.module('codeApp-login',[]);
    
    app.controller('loginController', 
    	[
    	'$http',
    	'$scope', 
    	'$routeParams', 
    	'DataService', 
    	'$location',
    	'$rootScope',
        '$stateParams',
    	function($http, $scope, $routeParams, DataService, $location,$stateParams){
    	$scope.loginShow=false;
                console.log($stateParams)
    }]);


})();