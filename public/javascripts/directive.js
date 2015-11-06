(function(){
	var app=angular.module('codeapp-profile',[ ]);
	app.directive('productTitle',function(){
		return {
			restrict: 'E',
			templateUrl:'product-title.html'
		};
	});

	app.directive('profilePanel',function(){
		return {
			restrict: 'E',
			templateUrl:'views/profile-panels.html',
			controller: function(){
				
			},
			controllerAs: 'panel'
		};
	});


})();