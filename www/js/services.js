angular.module('starter.services', [])

.factory('Games', function($http) {
  var games = [];

  return {
    create: function (name,motto,password) {
      if(password == null)
        password = "";
      $http.defaults.headers.common['x-access-token'] = window.localStorage['x-access-token'];
      return $http.post('http://localhost:8080/games/create', {'name':name,'motto':motto, 'password':password}).then(function(success){
        if(success.data.game){
          return success.data.game;
        }
        else  
          return null;
      });
    },
    all: function() {
      $http.defaults.headers.common['x-access-token'] = window.localStorage['x-access-token'];
      return $http({ url: "http://localhost:8080/games", method: "POST"}).then(function(success){
        if(success.data.games){
          return success.data.games;
        }
        else  
          return null;
      });
    },
    get: function(gameId) {
      $http.defaults.headers.common['x-access-token'] = window.localStorage['x-access-token'];
      return $http.post('http://localhost:8080/games', {'game-id':gameId}).then(function(success){
        if(success.data.game){
          return success.data.game;
        }
        else  
          return null;
      });
    },
    join: function(gameId) {
      $http.defaults.headers.common['x-access-token'] = window.localStorage['x-access-token'];
      return $http.post('http://localhost:8080/games/join', {'game-id':gameId}).then(function(success){
        if(success.data.game){
          return success.data.game;
        }
        else  
          return null;
      });
    }
  }
})

.factory('Messages', function($http){
  var messages = [];

  return {
    get: function(gameId) {
      $http.defaults.headers.common['x-access-token'] = window.localStorage['x-access-token'];
      console.log(gameId);
      return $http.post('http://localhost:8080/games/messages', {'game-id':gameId}).then(function(success){
        if(success.data.messages){
          return success.data.messages;
        }
        else  
          return null;
      });
    },    
    getSent: function(gameId,recipientId) {
      $http.defaults.headers.common['x-access-token'] = window.localStorage['x-access-token'];
      return $http.post('http://localhost:8080/games/messages/sent', {'game-id':gameId}).then(function(success){
        if(success.data.messages){
          return success.data.messages;
        }
        else  
          return null;
      });
    },
    getReceived: function(gameId,recipientId) {
      $http.defaults.headers.common['x-access-token'] = window.localStorage['x-access-token'];
      return $http.post('http://localhost:8080/games/messages/received', {'game-id':gameId}).then(function(success){
        if(success.data.messages){
          console.log(JSON.stringify(success.data.messages));
          return success.data.messages;
        }
        else  
          return null;
      });
    },
    sendMessage: function(gameId,recipientId,format,sentence) {
      console.log(gameId);
      console.log(recipientId);
      console.log(format);
      console.log(sentence);
      $http.defaults.headers.common['x-access-token'] = window.localStorage['x-access-token'];
      return $http.post('http://localhost:8080/games/createmessage', {'game-id':gameId, 'target':recipientId, 'phrase':sentence }).then(function(success){
        if(success.data.messages){
          return success.data.messages;
        }
        else  
          return null;
      });
    }
  }

});
