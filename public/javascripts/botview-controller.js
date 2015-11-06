(function () {
	"use strict";
	var hash;
    var app=angular.module('codeApp-botview',['codeapp-profile']);
    
    app.controller('botviewController', 
    	[
    	'$http',
    	'$scope', 
    	'$routeParams', 
    	'DataService', 
    	'$location',
    	'$rootScope',
    	function($http, $scope, $routeParams, DataService, $location,$rootScope){

    	$scope.postID = $routeParams.postID

    	$rootScope.$$childHead.homescreen = false;
		$rootScope.$$childHead.dashscreen = true;
		console.log()
    	DataService.getPostsbyID($scope.postID).then(function (response) {
    		if(response.data.errorCode==0)
		    {
		    	$scope.viewPost=response.data.response[0];
		    	$scope.tags=$scope.viewPost.tags.join(',');
		    	DataService.getrelatedPost($scope.tags, $scope.viewPost._id).then(function (response) {
		    		if(response.data.errorCode==0)
				    {
				    	$scope.relatedPost=response.data.response;
				    	console.log($scope.viewPost)
					}
				});
			}
			else
			{
				$location.path('/');
			}
		});

  
		
		$scope.backPost = function(){
			if($rootScope.$$childHead.from == 'guest')
				$location.path('/');
			else
				$location.path('bots');
		}
    }]);


})();