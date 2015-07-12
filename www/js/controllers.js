angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $cordovaFacebook) {
    
  $scope.facebookLogin = function () {
      console.log("not already logged in");
      $cordovaFacebook.login(["public_profile", "email", "user_friends"]).then(function(success) {
          $scope.access_token = success.authResponse.accessToken;
          $http.post("http://localhost:8100/rest-auth/facebook/", {access_token: $scope.access_token}).then(function(success) {
            window.localStorage['app_token'] = success.data.key;
            console.log(window.localStorage['app_token']);
            $http.defaults.headers.common['Authorization'] = "Token " + window.localStorage['app_token'];
            console.log("Success");
            $state.go('tab.play');
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
    $http.post("http://localhost:8100/rest-auth/logout/").then(function(success) {
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
});
