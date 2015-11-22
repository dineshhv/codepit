(function () {
    var app=angular.module('codeApp-newbot',[]);

	app.controller('newbotController', ['$http','$scope',function($http,$scope) {
		var mrtData=this
		// create a message to display in our view
		$scope.message = 'Login';
		$scope.user={}
		
		$scope.addUser=function(user){
			
			$http.post('/users/adduser', {username:$scope.user.username, password:$scope.user.password, email:$scope.user.email}).
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
			this.user={};
		};
	}]);       

})();