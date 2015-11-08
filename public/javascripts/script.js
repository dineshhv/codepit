	
	// create the module and name it scotchApp
	var app = angular.module('codeApp', [
		'ngRoute',
		'ngCookies',
		'ngResource',
		'codeApp-home',
		'codeApp-contact',
		'codeApp-about',
		'codeApp-bot',
		'codeApp-botview',
		'codeApp-newbot',
		'ngAnimate',
		'dateFilter',
		'tagjoiner',
		'codeApp-factory',
		'ngProgress',
		'textAngular',
		'ngNotify',
		'ui.router',
		'ui.foundation.pagination',
		'infinite-scroll'
		]); //,'angularVideoBg'

	// configure our routes
	app.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'views/home.html',
				controller  : 'mainController',
				controllerAs: 'loginCtrl'
			})
			.when('/bots', {
				templateUrl : 'views/minibot.html',
				controller  : 'botController',
				controllerAs: 'botsCtrl'
			})
			.when('/view/:postID', {
				templateUrl : 'views/viewbot.html',
				controller  : 'botviewController',
				controllerAs: 'botviewCtrl'
			})
			.when('/newbot', {
				templateUrl : 'views/newbot.html',
				controller  : 'newbotController',
				controllerAs: 'newbotCtrl'
			})
			// route for the about page
			.when('/about', {
				templateUrl : 'views/about.html',
				controller  : 'aboutCtrl',
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'views/contact.html',
				controller  : 'contactCtrl'
			});
	});



	app.service('dateFormate', function() {
	    this.dateConvert = function(a) {
	        var timestamp = 1293683278;
			var date = new Date(timestamp*1000);
			this.dateObj={}
			this.dateObj.year = date.getFullYear();
			this.dateObj.month = date.getMonth() + 1;
			this.dateObj.day = date.getDate();
			this.dateObj.hours = date.getHours();
			this.dateObj.minutes = date.getMinutes();
			this.dateObj.seconds = date.getSeconds();

			return this.dateObj;

	    }
	});	

	app.run(function($rootScope) {
	    $rootScope.panelshow = true;
	})
	app.controller('MainCtrl',[
	 	'$http',
		'$scope',
		'$location',
		'$cookies',
		'$cookieStore',function($http,$scope,$location,$cookies,$cookieStore){
	  	$scope.loginShow = false;
	  	$scope.registerShow = false;
	  	$scope.panelshow = true;
	  	this.user={}
		this.products=[];
		$scope.homescreen = true;
		$scope.dashscreen = false;
		$scope.userLogin=function(user){
			console.log(user)
			$http.post('/users/login', {username:this.user.username,password:this.user.password}).
			then(function(response) {
			    // this callback will be called asynchronously
			    // when the response is available
			    if(response.data.errorCode==0)
			    {
			    	$cookieStore.put('userSession', response.data.UHash);
			    	$cookies.put('userSession', response.data.UHash);
			    	$location.path('/bots')
			    	$scope.loginShow = false;
			    	$scope.panelshow = false;
			    }
			}, function(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			});
			this.user={};
		};
	  	$scope.showLogin = function(){
			$scope.loginShow = !$scope.loginShow;
			// console.log($scope.loginShow)
		}
	  
	}])

	// app.factory('myFactory', function(){
	//   var _artist = 'Shakira';
	//   var service = {};

	//   service.getArtist = function(){
	//     return _artist;
	//   }

	//   return service;
	// });