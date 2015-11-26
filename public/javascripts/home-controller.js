(function () {
    var app=angular.module('codeApp-home',[]);

	app.controller('homeController', [
		'$http',
		'$scope',
		'$location',
		'$cookies',
		'$cookieStore',
		'$rootScope',
		'DataService',
		'$stateParams',
		function($http,$scope,$location,$cookies,$cookieStore,$rootScope,DataService,$stateParams) {
		var login=this
		// create a message to display in our view
		$scope.message = 'Login';
		$scope.user={};
		$scope.searchtext=''
		$scope.hide = true;
		//http://localhost:3001/appInfo
		if($stateParams.type == 'page')
		{
			$rootScope.$$childHead.homescreen = true;
			$rootScope.$$childHead.dashscreen = false;
		}
		$scope.userLogin=function(user){
			
			$http.post('/users/login', {username:$scope.user.username,password:$scope.user.password}).
			then(function(response) {
			    // this callback will be called asynchronously
			    // when the response is available
			    if(response.data.errorCode==0)
			    {
			    	$cookieStore.put('userSession', response.data.UHash);
			    	$cookies.put('userSession', response.data.UHash);
			    	$location.path('/bots')
			    }
			}, function(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			});
			$scope.user={};
		};

		$scope.search = function(){
			if($scope.searchtext)
			{
				DataService.searchPosts($scope.searchtext).then(function (response) {
					$scope.hide = false;
					if(response.data.errorCode==0)
						$scope.searchpost = response.data.response;
					else
						$scope.searchpost = []


				});
			}
		}
		$scope.showPost = function()
		{
			$rootScope.$$childHead.from = 'guest'
			$location.path('view/'+this.item._id);
		}

	}]); 

	app.directive('keyEnter', function () {
	    return function (scope, element, attrs) {
	        element.bind("keydown keypress", function (event) {
	            if(event.which === 13) {
	                scope.$apply(function (){
	                    scope.$eval(attrs.keyEnter);

	                });
					event.preventDefault();
	            }
	        });
	    };
	});      

})();