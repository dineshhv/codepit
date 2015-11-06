(function () {
    var app=angular.module('codeApp-about',[]);

	app.controller('aboutController', function($scope) {
		$scope.message = 'Look! I am an about page.';
	});      

})();