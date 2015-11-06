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
    	function($http, $scope, $routeParams, DataService, $location){
    	$scope.loginShow=false;

    }]);


})();