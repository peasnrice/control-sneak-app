angular.module('starter.services', [])

.factory('Games', function($http) {
  var games = [];

  return {
    create: function (name,motto,password,playerHandle) {
      if(password == null)
        password = "";
      $http.defaults.headers.common['x-access-token'] = window.localStorage['x-access-token'];
      return $http.post('http://localhost:8080/games/create', {'name':name,'motto':motto, 'password':password, 'player-handle': playerHandle}).then(function(success){
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
    join: function(gameId,playerHandle,password) {
      $http.defaults.headers.common['x-access-token'] = window.localStorage['x-access-token'];
      return $http.post('http://localhost:8080/games/join', {'game-id':gameId, 'player-handle' : playerHandle, password : password}).then(function(success){
        if(success.data.game){
          return success.data.game;
        }
        else  
          return null;
      });
    },
    rejoin: function(gameId){
      $http.defaults.headers.common['x-access-token'] = window.localStorage['x-access-token'];
      return $http.post('http://localhost:8080/games/rejoin', {'game-id':gameId}).then(function(success){
        if(success.data.game){
          return success.data.game;
        }
        else  
          return null;
      });
    }
  }
})

.factory('User', function($http){
  return{
    getId: function(){
      $http.defaults.headers.common['x-access-token'] = window.localStorage['x-access-token'];
      return $http.get('http://localhost:8080/id').then(function(success){
        if(success.data.user_id != null){
          return success.data.user_id;
        }
        else  
          return null;
      });
    }
  }
})

.factory('Scores', function($http){
  return{
    getMessageScore: function(message) {
      $http.defaults.headers.common['x-access-token'] = window.localStorage['x-access-token'];
      return $http.post('http://localhost:8080/scores', {'message':message}).then(function(success){
        if(success.data['phrase-score']){
          return success.data['phrase-score'];
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
          return success.data.messages;
        }
        else  
          return null;
      });
    },
    sendMessage: function(gameId,recipientId,format,sentence) {
      $http.defaults.headers.common['x-access-token'] = window.localStorage['x-access-token'];
      return $http.post('http://localhost:8080/games/createmessage', {'game-id':gameId, 'target':recipientId, 'phrase':sentence }).then(function(success){
        if(success.data.messages){
          return success.data.messages;
        }
        else  
          return null;
      });
    },
    openMessage: function(gameId,messageId) {
      $http.defaults.headers.common['x-access-token'] = window.localStorage['x-access-token'];
      return $http.post('http://localhost:8080/games/messages/update', {'game-id':gameId, 'message-id':messageId, 'opened': true }).then(function(success){
        if(success.data.message){
          return success.data.message;
        }
        else  
          return null;
      });
    },

    updateAttempted: function(gameId,messageId,attempted) {
      $http.defaults.headers.common['x-access-token'] = window.localStorage['x-access-token'];
      return $http.post('http://localhost:8080/games/messages/update', {'game-id':gameId, 'message-id':messageId, 'attempted': attempted }).then(function(success){
        if(success.data.messages){
          return success.data.messages;
        }
        else  
          return null;
      });
    },

    thumbUp: function(gameId,messageId,state) {
      $http.defaults.headers.common['x-access-token'] = window.localStorage['x-access-token'];
      return $http.post('http://localhost:8080/games/messages/update', {'game-id':gameId, 'message-id':messageId, 'thumb-up': state}).then(function(success){
        if(success.data.state != null){
          var state = success.data.state;   
          var user_id = success.data.user_id;
          return {
              state: state,
              user_id: user_id
          }  
        }
        else  
          return null;
      });
    },

    thumbDown: function(gameId,messageId,state) {
      $http.defaults.headers.common['x-access-token'] = window.localStorage['x-access-token'];
      return $http.post('http://localhost:8080/games/messages/update', {'game-id':gameId,'message-id':messageId, 'thumb-down': state}).then(function(success){
        if(success.data.state != null){
          var state = success.data.state; 
          var user_id = success.data.user_id; 
          return {
              state: state,
              user_id: user_id
          }  
        }
        else  
          return null;
      });
    },

    favourite: function(gameId,messageId,state) {
      $http.defaults.headers.common['x-access-token'] = window.localStorage['x-access-token'];
      return $http.post('http://localhost:8080/games/messages/update', {'game-id':gameId, 'message-id':messageId, 'favourite': state}).then(function(success){
        if(success.data.state != null){
          var state = success.data.state;  
          var user_id = success.data.user_id;
          return {
              state: state,
              user_id: user_id
          }  
        }
        else  
          return null;
      });
    }
  }

});
