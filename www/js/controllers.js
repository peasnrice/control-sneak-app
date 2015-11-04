angular.module('starter.controllers', [])

.controller('SocialLoginCtrl', function($scope, $http, $state, $cordovaFacebook, $cordovaOauth) {
    
  var tabs = document.querySelectorAll('div.tabs')[0];
  tabs = angular.element(tabs);
  tabs.css('display','none');
    
  $scope.$on('$destroy', function(){
    tabs.css('display', '');
  });
    
  $scope.GoToEmailLogin = function() {
    $state.go('emaillogin');
  };


//	$scope.facebookLogin = function() {
//		console.log("not already logged in");
//		$cordovaOauth.facebook("1678602979038851", ["public_profile", "email", "user_friends"]).then(function(result) {
//			$scope.access_token = success.authResponse.accessToken;
//            console.log($scope.access_token);
//		}, function(error) {
//			// error
//		});
//	};
	
 	var GOOGLE_CLIENT_ID = "470500124066-oig3diapgk68ghimd0k5ktv6bro8leji.apps.googleusercontent.com";
	
	$scope.googleLogin = function() {
		$cordovaOauth.google(GOOGLE_CLIENT_ID, ["email"]).then(function(success) {
			$scope.access_token = success.access_token;
			console.log($scope.access_token);
			var url = "http://localhost:3000/login/google/?access_token=" + $scope.access_token;
			$http.post(url).then(function(success) {
				console.log(success);
	//            	window.localStorage['app_token'] = success.data.key;
	//            	console.log(window.localStorage['app_token']);
	//            	$http.defaults.headers.common['Authorization'] = "Token " + window.localStorage['app_token'];
	//            	console.log("Success");
	//            	$state.go('tab.play');
	//            	console.log("we got code: " + $scope.app_token);
			}, function(error) {
				// console.log("couldn't get api key");
		  });
	   }, function (error) {
		console.log("facebook login failed");
	   });
	};
	
  $scope.facebookLogin = function () {
      console.log("not already logged in");
      $cordovaFacebook.login(["public_profile", "email", "user_friends"]).then(function(success) {
          $scope.access_token = success.authResponse.accessToken;
          console.log($scope.access_token);

		  var url = "http://localhost:3000/login/facebook/?access_token=" + $scope.access_token;
		  
          $http.post(url).then(function(success) {
			  console.log(success);
           // window.localStorage['x-access-token'] = success.data.token;
           // console.log(window.localStorage['app_token']);
           // $http.defaults.headers.common['Authorization'] = "Token " + window.localStorage['app_token'];
           // console.log("Success");
           // $state.go('tab.play');
           // console.log("we got code: " + $scope.app_token);
            }, function(error) {
              // console.log("couldn't get django api key");
          });
       }, function (error) {
        console.log("facebook login failed");
       });
     // });
   };

  $scope.logout = function () {
    $http.post("http://localhost:8080/rest-auth/logout/").then(function(success) {
          $http.defaults.headers.common['Authorization'] = undefined;
          $cordovaFacebook.logout()
            .then(function(success) {
              console.log("logout succesful");
            }, function (error) {
              console.error('ERR', err);
              $state.go('signin');
            });
          $state.go('signin');
        }, function(err) {
          console.error('ERR', err);
          $state.go('signin');
    });
  };
    
})

.controller('EmailLoginCtrl', function($scope, $http, $state) {
  
  var tabs = document.querySelectorAll('div.tabs')[0];
  tabs = angular.element(tabs);
  tabs.css('display','none');
    
  $scope.$on('$destroy', function(){
    tabs.css('display', '');
  });
    
  $scope.GoToEmailSignup = function() {
    $state.go('emailsignup');
  };
  
  $scope.GoToForgotPassword = function() {
    $state.go('forgotpassword');
  };
	
	$scope.login = function() {
		$http.post("http://localhost:8080/login", {email: $scope.username, password : $scope.password}).then(function(success) {
      // save the app token locally on the device and save it to the header of all future requests.
      window.localStorage['x-access-token'] = success.data.token;
      $http.defaults.headers.common['x-access-token'] = window.localStorage['x-access-token'];

      // go to game list screen
      $state.go('gamelist');
		}, function(err) {
			console.log(err);
		});
	};

})

.controller('EmailSignUpCtrl', function($scope, $http, $state) {
  
  var tabs = document.querySelectorAll('div.tabs')[0];
  tabs = angular.element(tabs);
  tabs.css('display','none');
    
  $scope.$on('$destroy', function(){
    tabs.css('display', '');
  });
	
	$scope.signup = function() {
		console.log($scope.username);
		console.log($scope.password);

    $http({
      url: "http://localhost:8080/signup", 
      method: "POST",
      params: {email: $scope.username, password: $scope.password}
    }).then(function(success) {
      console.log(success);
    }, function(err) {
      console.log(err);
    });;

		// $http.post("http://localhost:8080/signup", {username: $scope.username, password : $scope.password}).then(function(success) {
		// 	console.log(success);
		// }, function(err) {
		// 	console.log(err);
		// });
	};
   
})

.controller('ForgotPasswordCtrl', function($scope, $http, $state) {
  
  var tabs = document.querySelectorAll('div.tabs')[0];
  tabs = angular.element(tabs);
  tabs.css('display','none');

  $scope.$on('$destroy', function(){
    tabs.css('display', '');
  });
})

.controller('GameListCtrl', function($scope, $http, $state, Games){
  Games.all().then(function(games){
    $scope.games = games;
  });
  $scope.JoinGameRoom = function(){
    $state.go('gameroom');
  }
})

.controller('GameRoomCtrl', function($scope, $http, $state, $stateParams, Games){
  Games.get($stateParams.gameId).then(function(game){
    $scope.game = game;
  });
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('NavCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.showRightMenu = function () {
    $ionicSideMenuDelegate.toggleRight();
  };
});
