	
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
	// app.config(function($routeProvider) {
	// 	$routeProvider

	// 		// route for the home page
	// 		.when('/', {
	// 			templateUrl : 'views/home.html',
	// 			controller  : 'mainController',
	// 			controllerAs: 'loginCtrl'
	// 		})
	// 		.when('/bots', {
	// 			templateUrl : 'views/minibot.html',
	// 			controller  : 'botController',
	// 			controllerAs: 'botsCtrl'
	// 		})
	// 		.when('/view/:postID', {
	// 			templateUrl : 'views/viewbot.html',
	// 			controller  : 'botviewController',
	// 			controllerAs: 'botviewCtrl'
	// 		})
	// 		.when('/newbot', {
	// 			templateUrl : 'views/newbot.html',
	// 			controller  : 'newbotController',
	// 			controllerAs: 'newbotCtrl'
	// 		})
			
	// });

	app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

	        $urlRouterProvider.otherwise('/');

	        // States
	        $stateProvider
	          .state('landing', {
	              	url: "/",
	              	templateUrl: function(urlattr){
	                	return '/views/home.html';
	              	},
            		controller: 'mainController',
		            controllerAs: 'loginCtrl',
	              	params : { type: 'page' },
	          })
	          .state('bots', {
	              	url: "/bots",
	              	templateUrl: function(urlattr){
	                	return '/views/minibot.html';
	              	},
            		controller: 'botController',
		            controllerAs: 'botsCtrl',
	              	params : { type: 'blog' },
	          })
	          .state('newbot', {
	              	url: "/bots",
	              	templateUrl: function(urlattr){
	                	return '/views/newbot.html';
	              	},
            		controller: 'newbotController',
		            controllerAs: 'newbotCtrl',
	              	params : { type: 'page' }
	          })
	          .state('view', {
	              	url: "/view/:postID",
	              	templateUrl: function(urlattr){
	                	return '/views/viewbot.html';
	              	},
            		controller: 'botviewController',
					controllerAs: 'botviewCtrl',
	              	params : { type: 'blog' }
	          })
	          .state('about', {
	              	url: "/about",
	              	templateUrl: function(urlattr){
	                	return '/views/about.html';
	              	},
            		controller: 'aboutCtrl',
	              	params : { type: 'page' }
	          })
	          .state('contact', {
	              	url: "/contact",
	              	templateUrl: function(urlattr){
	                	return '/views/contact.html';
	              	},
            		controller: 'contactCtrl',
	              	params : { type: 'page' }
	          })
	          
	    //       .state('dashboard', {
		   //          url: "/dashboard",
		   //          views: {
		   //          	'@':{
			  //             	templateUrl: '/admin/dashboard.html',
				 //            controller: 'dashboardController',
				 //            controllerAs: 'dashboardCtrl',
				 //        },
				 //        'dashContent@dashboard': {
				 //        	templateUrl: '/admin/dashboard-home.html',
				 //        	// controller: 'createpostController',
				 //        }
		   //      	},
		   //      	params : { type: 'admin'},
				 //  	UIbreadcrumb:{
				 //  		name: "Dashboard"
				 //  	},
				 //  	data: {
					//     css: 'admin/stylesheets/admin.css'
					// }
		   //    })
		   //    .state('dashboard.managepage', {
		   //          url: "/managepage",
		   //          views: {
				 //      'dashContent': {
				 //        templateUrl: '/admin/managepage.html',
				 //        controller: 'managepageController',
				 //        params : { type: 'admin' }
				 //      }
				 //  	},
				 //  	UIbreadcrumb:{
				 //  		name: "Manage Page"
				 //  	}
		   //    })
		   //    .state('dashboard.managepage.createpage', {
		   //          url: "/createpage",
		   //          views: {
				 //      'dashContent@dashboard': {
				 //        templateUrl: '/admin/createpage.html',
				 //        controller: 'createpageController',
				 //        params : { type: 'admin' }
				 //      }
				 //  	},
				 //  	UIbreadcrumb:{
				 //  		name: "Create Page"
				 //  	}
		   //    })
		   //    .state('dashboard.managepost', {
		   //          url: "/managepost",
		   //          views: {
				 //      'dashContent': {
				 //        templateUrl: '/admin/managepost.html',
				 //        controller: 'managepostController',
				 //        params : { type: 'admin' }
				 //      }
				 //  	},
				 //  	UIbreadcrumb:{
				 //  		name: "Manage Post"
				 //  	},
				 //  	data: {
					//     css: 'admin/stylesheets/admin.css'
					// }
		   //    })
		   //    .state('dashboard.managepost.createpost', {
		   //          url: "/createpost",
		   //          views: {
				 //      'dashContent@dashboard': {
				 //        templateUrl: '/admin/createpost.html',
				 //        controller: 'createpostController',
				 //        params : { type: 'admin' }
				 //      }
				 //  	},
				 //  	UIbreadcrumb:{
				 //  		name: "Create Post"
				 //  	}
		   //    })
		   //   .state('dashboard.media', {
		   //          url: "/media",
		   //          views: {
				 //      'dashContent': {
				 //        templateUrl: '/admin/media.html',
				 //        // controller: 'mediaController',
				 //        params : { type: 'admin' }
				 //      }
				 //  	},
				 //  	UIbreadcrumb:{
				 //  		name: "Media"
				 //  	}
		   //    })
		   //    .state('dashboard.comments', {
		   //          url: "/comments",
		   //          views: {
				 //      'dashContent': {
				 //        templateUrl: '/admin/comments.html',
				 //        // controller: 'commentsController',
				 //        params : { type: 'admin' }
				 //      }
				 //  	},
				 //  	UIbreadcrumb:{
				 //  		name: "Comments"
				 //  	}
		   //    })
		   //    .state('dashboard.links', {
		   //          url: "/links",
		   //          views: {
				 //      'dashContent': {
				 //        templateUrl: '/admin/links.html',
				 //        // controller: 'linksController',
				 //        params : { type: 'admin' }
				 //      }
				 //  	},
				 //  	UIbreadcrumb:{
				 //  		name: "Links"
				 //  	}
		   //    })
		   //    .state('dashboard.appearance', {
		   //          url: "/appearance",
		   //          views: {
				 //      'dashContent': {
				 //        templateUrl: '/admin/appearance.html',
				 //        // controller: 'appearenceController',
				 //        params : { type: 'admin' }
				 //      }
				 //  	},
				 //  	UIbreadcrumb:{
				 //  		name: "Appearance"
				 //  	}
		   //    })
		   //    .state('dashboard.user', {
		   //          url: "/user",
		   //          views: {
				 //      'dashContent': {
				 //        templateUrl: '/admin/user.html',
				 //        // controller: 'userController',
				 //        params : { type: 'admin' }
				 //      }
				 //  	},
				 //  	UIbreadcrumb:{
				 //  		name: "User"
				 //  	}
		   //    })
		   //    .state('dashboard.modules', {
		   //          url: "/modules",
		   //          views: {
				 //      'dashContent': {
				 //        templateUrl: '/admin/modules.html',
				 //        // controller: 'moduleController',
				 //        params : { type: 'admin' }
				 //      }
				 //  	},
				 //  	UIbreadcrumb:{
				 //  		name: "Modules"
				 //  	}
		   //    })
		   //    .state('dashboard.settings', {
		   //          url: "/settings",
		   //          views: {
				 //      'dashContent': {
				 //        templateUrl: '/admin/settings.html',
				 //        // controller: 'settingsController',
				 //        params : { type: 'admin' }
				 //      }
				 //  	},
				 //  	UIbreadcrumb:{
				 //  		name: "Settings"
				 //  	}
		   //    })

	    }
	]).run(['$rootScope', '$state', '$stateParams',
	  function ($rootScope, $state, $stateParams) {
	    $rootScope.$state = $state;
	    $rootScope.$stateParams = $stateParams;
	}])

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
		'$cookieStore',
		'$state',
		'$stateParams',function($http,$scope,$location,$cookies,$cookieStore,$state,$stateParams){
	  	$scope.loginShow = false;
	  	$scope.registerShow = false;
	  	$scope.panelshow = true;
	  	this.user={}
		this.products=[];
		if($state.params.type == 'page')
		{
			$scope.homescreen = true;
			$scope.dashscreen = false;
		}
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