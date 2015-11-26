(function () {
	"use strict";
	var hash;
    var app=angular.module('codeApp-botview',['codeapp-profile']);
    
    app.controller('viewPostController', 
    	[
    	'$http',
    	'$scope', 
    	'$routeParams', 
    	'DataService', 
    	'$location',
    	'$rootScope',
    	'$state',
		'$stateParams',
    	function($http, $scope, $routeParams, DataService, $location,$rootScope,$state,$stateParams){

    	$scope.postID = $stateParams.postID

    	$rootScope.$$childHead.homescreen = false;
		$rootScope.$$childHead.dashscreen = true;

    	DataService.getPostsbyAlias($scope.postID).then(function (response) {
    		if(response.data.errorCode==0)
		    {
		    	$scope.viewPost=response.data.response[0];
		    	$scope.tags=$scope.viewPost.tags.join(',');
		    	DataService.getrelatedPost($scope.tags, $scope.viewPost._id).then(function (response) {
		    		if(response.data.errorCode==0)
				    {
				    	$scope.relatedPost=response.data.response;
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