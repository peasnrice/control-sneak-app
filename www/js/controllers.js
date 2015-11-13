angular.module('starter.controllers', [])

.controller('MenuController', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})
.controller('Controller', function($scope, $ionicSideMenuDelegate) {
})
.controller('HomeController', function($scope, $http, $state, $cordovaFacebook, $cordovaOauth, $ionicSideMenuDelegate) {
    
  
  $scope.GoToEmailLogin = function() {
    $state.go('menu.email-login');
  };
  
  var GOOGLE_CLIENT_ID = "470500124066-oig3diapgk68ghimd0k5ktv6bro8leji.apps.googleusercontent.com";
  
  $scope.googleLogin = function() {
    $cordovaOauth.google(GOOGLE_CLIENT_ID, ["email"]).then(function(success) {
      $scope.access_token = success.access_token;
      console.log($scope.access_token);
      var url = "http://localhost:3000/login/google/?access_token=" + $scope.access_token;
      $http.post(url).then(function(success) {
        console.log(success);
      }, function(error) {
        // console.log("couldn't get api key");
      });
     }, function (error) {
    console.log("google login failed");
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
            }, function(error) {
          });
       }, function (error) {
        console.log("facebook login failed");
       });
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
.controller('EmailLoginController', function($scope, $http, $state, $ionicSideMenuDelegate) {
  var tabs = document.querySelectorAll('div.tabs')[0];
  tabs = angular.element(tabs);
  tabs.css('display','none');
    
  $scope.$on('$destroy', function(){
    tabs.css('display', '');
  });
    
  $scope.GoToEmailSignup = function() {
    $state.go('menu.email-signup');
  };
  
  $scope.GoToForgotPassword = function() {
    $state.go('menu.forgotpassword');
  };
  
  $scope.login = function() {
    $http.post("http://localhost:8080/login", {email: $scope.username, password : $scope.password}).then(function(success) {
      // save the app token locally on the device and save it to the header of all future requests.
      window.localStorage['x-access-token'] = success.data.token;
      $http.defaults.headers.common['x-access-token'] = window.localStorage['x-access-token'];
      // go to game list screen
      $state.go('menu.game-list');
    }, function(err) {
      console.log(err);
    });
  };
})

.controller('GameListController', function($scope, $http, $state, Games, $ionicSideMenuDelegate) {
  Games.all().then(function(games){
    $scope.games = games;
  });
})

.controller('CreateGameController', function($scope, $http, $state, Games, $ionicSideMenuDelegate) {
  $scope.game = {};

  $scope.createGame = function() {
    Games.create($scope.game.name, $scope.game.motto, $scope.game.password).then(function(game){
      $state.go('menu.game-room-create', { gameId: game._id });
    });
  }  
})

.controller('GameRoomCreateController', function($scope, $http, $state, $stateParams, Games, Messages, $ionicSideMenuDelegate) {
  
  $scope.message = {};

  Games.join($stateParams.gameId).then(function(game){
    $scope.game = game;
  });

  $scope.sendMessage = function() {
    Messages.sendMessage($stateParams.gameId, $scope.message.recipient, $scope.message.format, $scope.message.sentence).then(function(messages){
      $scope.messages = messages;
    });
  }
})

.controller('GameRoomReceiveController', function($scope, $http, $state, $stateParams, Games, Messages, $ionicSideMenuDelegate) {
  Games.get($stateParams.gameId).then(function(game){
    $scope.game = game;
  });
  Messages.getReceived($stateParams.gameId).then(function(messages){
    $scope.messages = messages;
  });
})

.controller('GameRoomSneaksController', function($scope, $http, $state, $stateParams, Games, $ionicSideMenuDelegate) {
  Games.get($stateParams.gameId).then(function(game){
    $scope.game = game;
  });  
})

.controller('GameRoomScoreController', function($scope, $http, $state, $stateParams, Games, $ionicSideMenuDelegate) {
  Games.get($stateParams.gameId).then(function(game){
    $scope.game = game;
  });  
})

.controller('ProfileController', function($scope, $ionicSideMenuDelegate) {
})
.controller('SettingsController', function($scope, $ionicSideMenuDelegate) {
})
.controller('GlobalStatsController', function($scope, $ionicSideMenuDelegate) {
})


.controller('EmailSignUpController', function($scope, $http, $state) {
	
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
    });
	};
   
});

