(function () {
    var app=angular.module('codeApp-newbot',[]);

	app.controller('newbotController', ['$http','$scope',function($http,$scope) {
		var mrtData=this
		// create a message to display in our view
		$scope.message = 'Login';
		$http.get('http://54.169.160.2:3000/travel/all').success(function(data){
			mrtData.stations=data;
			$scope.stations=data;
		});
		 $scope.videoId = 'iNJdPyoqt8U';

          
		 $scope.videos = [{
              videoId: 'iNJdPyoqt8U',
              start: 30,
              end: 40
          }];
	}]);       

})();