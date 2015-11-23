(function () {
	"use strict";
	var hash
    var app=angular.module('codeApp-bot',['codeapp-profile']);

	app.controller('botController', [
		'$http',
		'$scope',
		'$location',
		'$cookies',
		'$cookieStore',
		'$timeout',
		'dateFormate',
		'ngProgressFactory',
		'DataService',
		'$rootScope',
        '$stateParams',
		'Endless',function($http,$scope,$location,$cookies,$cookieStore,$timeout,dateFormate,ngProgressFactory,DataService,$rootScope, $stateParams,Endless) {
		var codeAppData=this
		console.log($stateParams)
		// create a message to display in our view
		// console.log(dateFormate.dateConvert(1422200798441))
		// $scope.progressbar = ngProgressFactory.createInstance();
  //       $scope.progressbar.start();

		
		$rootScope.$$childHead.homescreen = false;
		$rootScope.$$childHead.dashscreen = true;
        $scope.itemsPerPage = 10
	    $scope.totalItems = 47 // 5 pages
	    $scope.currentPage = 3

	    $scope.bigTotalItems = 167 // 5 pages
	    $scope.maxSize = 5

	    $scope.maxSizeZero = 0
		
		$scope.blocktype = true;
		$scope.listtype = false;
		$scope.userHash	=	$cookies.get('userSession');
		hash = $scope.userHash
		if(!$scope.userHash)
		{
			$location.path('/');
		}
		
		// ngNotify.set('Post Created Successfully');
		this.changeOrder = function(type){
			if(type==='block')
			{
				$scope.blocktype = true;
				$scope.listtype = false;
			}
			else
			{
				$scope.blocktype = false;
				$scope.listtype = true;
			}
			$scope.changetype	= type;
		}

		DataService.getProfile($scope.userHash).then(function (response) {
			
		    if(response.data.errorCode==0)
				$scope.itsMe=response.data.response[0];
			else
				$location.path('/');


		});
		// DataService.getPosts($scope.userHash).then(function (response) {
		// 	$scope.progressbar.complete();
		//     if(response.data.errorCode==0)
		//     {
		// 		$scope.myPosts=response.data.response.data;
		// 		$scope.nextSet=response.data.response.after;
		// 	}
		// 	else
		// 	{
		// 		$location.path('/');
		// 	}
		// });
		
		$scope.showPost = function(){
			$rootScope.$$childHead.from = 'user'
			$location.path('view/'+this.items._id);
		}

		 $scope.endless = new Endless($scope);
		

		 $scope.modalShown = false;
		 $scope.msg = 'dinesh';
		 $scope.toggleModal = function() {
		    $scope.modalShown = !$scope.modalShown;
		 };
		 
		 this.newpost={}
		 this.addPost = function (post){
		 	this.newpost.createdOn=new Date().getTime()
		 	this.newpost.userID=$scope.userHash;

		 	// $scope.myPosts.push(this.newpost);
		 	$scope.itsMe.postCount++;

		 	$scope.endless.addnewPost(this.newpost).success(function(response){
		 		if(response.errorCode == "0")
		 			this.newpost._id = response.postID;

		 	})
		 	this.newpost={}
		 	// 	DataService.addPost(this.newpost).then(function (response) {
			// 	if(response.data.errorCode=='0')
			// 	{
			// 		//ngNotify.set('Post Created Successfully');
			// 	}
			// 	this.newpost={}
			// });
		 	
		 	
		 }
	}]);      


	
	app.factory('Endless', function($http,ngProgressFactory) {
	  var Endless = function() {
	    this.items = [];
	    this.busy = false;
	    this.after = null;
	  };
	  Endless.prototype.addnewPost = function(newpost) {
	  	this.items.push(newpost);
	  	this.url='posts/addPost';
		var promise=$http.post(this.url,newpost).success(function (data) {
			return data;
	    });
	    return promise;
	  };
	  Endless.prototype.nextPage = function() {
	  	Endless.progressbar = ngProgressFactory.createInstance();
        Endless.progressbar.start();
	    if (this.busy) return;
	    this.busy = true; 

	    var url = "posts/" + hash;
	    if(this.after)
	    {
	    	url+= "/after/"+this.after;
	    }
	    $http.get(url).success(function(data) {
	    	Endless.progressbar.complete();
	    	if(data.errorCode==0)
	    	{
		    	var items = data.response.data;
			      for (var i = 0; i < items.length; i++) {
			      	this.items.push(items[i]);
			      }
		      	this.after = data.response.after;
		      	this.busy = false;
	      	}
	    }.bind(this)); //
	  };

	  return Endless;
	});

	
	app.directive('modalDialog', function() {
	  return {
	    restrict: 'E',
	    scope: {
	      show: '=',
	      dash: '=',
	      postings: '='
	    },

	    replace: true, // Replace with the template below
	    transclude: true, // we want to insert custom content inside the directive
	    link: function(scope, element, attrs) {
	      scope.dialogStyle = {};
	      if (attrs.width)
	        scope.dialogStyle.width = attrs.width;
	      if (attrs.height)
	        scope.dialogStyle.height = attrs.height;
	      scope.hideModal = function() {
	      	
	        scope.show = false;
	      };
	    },
	    
	    // template: "<div class='ng-modal' ng-show='show'> <div class='ng-modal-overlay' ng-click='hideModal()'></div> <div class='ng-modal-dialog' ng-style='dialogStyle'> <div class='ng-modal-close' ng-click='hideModal()'>X</div> <div class='ng-modal-dialog-content'> test</div> </div> </div>"
	    templateUrl: "views/model.html",
	   
	  };
	});

})();

