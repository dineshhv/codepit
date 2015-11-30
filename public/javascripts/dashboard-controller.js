(function () {
	"use strict";
	var hash
    var app=angular.module('codeApp-bot',['codeapp-profile']);

	app.controller('dashboardController', [
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
  		$scope.profileUploadShow = false;
		$rootScope.$$childHead.overlayShow = false;
		$rootScope.$$childHead.loginShow = false;
		$rootScope.$$childHead.registerShow = false;

		$rootScope.$$childHead.homescreen = false;
		$rootScope.$$childHead.dashscreen = true;
        $scope.itemsPerPage = 10
	    $scope.totalItems = 47 // 5 pages
	    $scope.currentPage = 3

	    $scope.bigTotalItems = 167 // 5 pages
	    $scope.maxSize = 5

	    $scope.maxSizeZero = 0
		$scope.imageCropStep = 2

		// $scope.myprofileImage = 'data:image/gif;base64,';
		$scope.blocktype = true;
		$scope.listtype = false;
		$scope.userHash	=	$cookies.get('userSession');
		hash = $scope.userHash
		if(!$scope.userHash)
		{
			// $location.path('/');
		}
		$scope.getImage = function(){
			return $scope.imgSrc;
		}
		// ngNotify.set('Post Created Successfully');
		$scope.changeOrder = function(type){
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
		    {
				$scope.itsMe=response.data.response[0];
				if($scope.itsMe.profileImage&&$scope.itsMe.profileImage!='')
					$scope.myprofileImage = $scope.itsMe.profileImage;
				else
					$scope.myprofileImage = "data:image/png;base64,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"
				$scope.$apply();
		    }
			else
			{
				$location.path('/');
			}


		});
		
		
		$scope.showPost = function(){
			$rootScope.$$childHead.from = 'user'
			$location.path('view/'+this.items.alias);
		}

		$scope.endless = new Endless($scope);
		

		$scope.modalShown = false;
		$scope.msg = 'dinesh';
		
		$scope.toggleModal = function() {
		    $scope.modalShown = !$scope.modalShown;
		};
		 
		$scope.newpost={}
		$scope.addPost = function (post){
		 	$scope.newpost.createdOn=new Date().getTime()
		 	$scope.newpost.userID=$scope.userHash;

		 	// $scope.myPosts.push(this.newpost);
		 	$scope.itsMe.postCount++;

		 	$scope.endless.addnewPost($scope.newpost).success(function(response){
		 		if(response.errorCode == "0")
		 			$scope.newpost._id = response.postID;

		 	})
		 	$scope.newpost={}
		 	// 	DataService.addPost(this.newpost).then(function (response) {
			// 	if(response.data.errorCode=='0')
			// 	{
			// 		//ngNotify.set('Post Created Successfully');
			// 	}
			// 	this.newpost={}
			// });
		 	
		 	
		 }

		 $scope.fileChanged = function(e) {			
		
			var files = e.target.files;
			$scope.fname = files[0].name;
     		var fileReader = new FileReader();
			fileReader.readAsDataURL(files[0]);		
			
			fileReader.onload = function(e) {
				$scope.imgSrc = this.result;
				$scope.$apply();
			};
			
		}

		$scope.saveprofile = function(){
			$scope.myprofileImage = $scope.result;
			var payload = {}
			payload.userID = $scope.userHash
			payload.profileImage = $scope.myprofileImage;
			DataService.setProfileImage(payload).then(function (response) {
				console.log(response)
				$rootScope.$$childHead.Overlayclick();
				$scope.clear();
			});
		}

		$scope.clear = function() {
			 $scope.imageCropStep = 1;
			 delete $scope.imgSrc;
			 delete $scope.result;
			 delete $scope.resultBlob;
		};

		$scope.showProfile = function(){
		 	
		 	$scope.profileUploadShow = !$scope.profileUploadShow;
		 	$rootScope.$$childHead.overlayShow  = !$rootScope.$$childHead.overlayShow ;
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

