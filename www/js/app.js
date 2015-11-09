// // Ionic Starter App

// // angular.module is a global place for creating, registering and retrieving Angular modules
// // 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// // the 2nd parameter is an array of 'requires'
// // 'starter.services' is found in services.js
// // 'starter.controllers' is found in controllers.js
// angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

// .run(function($ionicPlatform) {
//   $ionicPlatform.ready(function() {
//     // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//     // for form inputs)
//     if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
//       cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//     }
//     if (window.StatusBar) {
//       // org.apache.cordova.statusbar required
//       StatusBar.styleLightContent();
//     }
//   });
// })

// .config(function($stateProvider, $urlRouterProvider, $cordovaFacebookProvider) {

	
//   // Ionic uses AngularUI Router which uses the concept of states
//   // Learn more here: https://github.com/angular-ui/ui-router
//   // Set up the various states which the app can be in.
//   // Each state's controller can be found in controllers.js
//   $stateProvider

  
//   .state('login', {
//     url: '/login',
//     templateUrl: 'templates/login.html',
//     controller: 'SocialLoginCtrl'
//   })
  
//   .state('emaillogin', {
//     url: '/email-login',
//     templateUrl: 'templates/email-login.html',
//     controller: 'EmailLoginCtrl'
//   })
  
//   .state('emailsignup', {
//     url: '/email-signup',
//     templateUrl: 'templates/email-signup.html',
// 	 controller: 'EmailSignUpCtrl',
//   })
  
//   .state('forgotpassword', {
//     url: '/forgot-password',
//     templateUrl: 'templates/forgot-password.html',
// 	 controller: 'ForgotPasswordCtrl',
//   })

//   .state('gamelist', {
//     url: '/games',
//     templateUrl: 'templates/game-list.html',
//     controller: 'GameListCtrl',
//   })

//   // .state('gameroom', {
//   //   url: '/games/:gameId',
//   //   abstarct: true,
//   //   controller: 'GameRoomCtrl'
//   // })

//   // .state('gameroom.players', {
//   //   url: '/games/:gameId',
//   //   templateUrl: 'templates/game-room.html',
//   //   controller: 'GameRoomCtrl'
//   // });

//   .state('gameroom', {
//     url: '/games/:gameId',
//     abstract: true,
//     templateUrl: 'templates/menu.html'
//   })

//   .state('gameroom.create', {
//       url: '/create/:gameId',
//       views: {
//           'view-content': {
//               templateUrl: 'templates/gameroom-create.html',
//               controller : 'CreateCtrl'
//           }
//       }
//   });

//   // .state('gameroom.messages', {
//   //     url: '/games/:gameId/messages',
//   //     views: {
//   //         'view-content': {
//   //             templateUrl: 'templates/gameroom-messages.html',
//   //             controller : 'MessagesCtrl'
//   //         }
//   //     }
//   // })

//   // .state('gameroom.sneakyboard', {
//   //     url: '/games/:gameId/sneakyboard',
//   //     views: {
//   //         'view-content': {
//   //             templateUrl: 'templates/gameroom-sneakyboard.html',
//   //             controller : 'SneakyBoardCtrl'
//   //         }
//   //     }
//   // })

//   // .state('gameroom.stats', {
//   //     url: '/games/:gameId/stats',
//   //     views: {
//   //         'view-content': {
//   //             templateUrl: 'templates/gameroom-stats.html',
//   //             controller : 'StatsCtrl'
//   //         }
//   //     }
//   // });


//   // // setup an abstract state for the tabs directive
//   // .state('tab', {
//   //   url: "/tab",
//   //   abstract: true,
//   //   templateUrl: "templates/tabs.html"
//   // })

//   // .state('tab.chats', {
//   //   url: '/chats',
//   //   views: {
//   //     'tab-chats': {
//   //       templateUrl: 'templates/tab-chats.html',
//   //       controller: 'ChatsCtrl'
//   //     }
//   //   }
//   // })
  
//   // .state('tab.chat-detail', {
//   //   url: '/chats/:chatId',
//   //   views: {
//   //     'tab-chats': {
//   //       templateUrl: 'templates/chat-detail.html',
//   //       controller: 'ChatDetailCtrl'
//   //     }
//   //   }
//   // })

//   // .state('tab.account', {
//   //   url: '/account',
//   //   views: {
//   //     'tab-account': {
//   //       templateUrl: 'templates/tab-account.html',
//   //       controller: 'AccountCtrl'
//   //     }
//   //   }
//   // });

//   // if none of the above states are matched, use this as the fallback
//   $urlRouterProvider.otherwise('/login');

// });



angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', '$cordovaFacebookProvider', function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $cordovaFacebookProvider) {

    $ionicConfigProvider.backButton.text('').previousTitleText(false);

    $stateProvider
        .state('menu', {
            url : '/menu',
            templateUrl : 'templates/menu-abstract.html', 
            abstract : true,
            controller : 'MenuController'
        })

        .state('menu.home', {
            url: '/home',
            views: {
                'view-content': {
                    templateUrl: 'templates/home.html',
                    controller : 'HomeController'
                }
            }
        })

        .state('menu.email-login', {
            url: '/email-login',
            views: {
                'view-content': {
                    templateUrl: 'templates/email-login.html',
                    controller: 'EmailLoginController'
                }
            }
        })      

        .state('menu.game-list', {
            url: '/game-list',
            views: {
                'view-content': {
                    templateUrl: 'templates/game-list.html',
                    controller: 'GameListController'
                }
            }
        })

        .state('menu.game-room-create', {
            url: '/game/:gameId/create',
            views: {
                'view-content': {
                    templateUrl: 'templates/game-room-create.html',
                    controller: 'GameRoomCreateController'
                }
            }
        })

        .state('menu.game-room-receive', {
            url: '/game/:gameId/receive',
            views: {
                'view-content': {
                    templateUrl: 'templates/game-room-receive.html',
                    controller: 'GameRoomReceiveController'
                }
            }
        })

        .state('menu.game-room-sneaks', {
            url: '/game/:gameId/sneaks',
            views: {
                'view-content': {
                    templateUrl: 'templates/game-room-sneaks.html',
                    controller: 'GameRoomSneaksController'
                }
            }
        })

        .state('menu.game-room-score', {
            url: '/game/:gameId/score',
            views: {
                'view-content': {
                    templateUrl: 'templates/game-room-score.html',
                    controller: 'GameRoomScoreController'
                }
            }
        })

        // #/game/{{game.id}}/create

        // .state('menu.drink', {
        //     url: '/drink',
        //     views: {
        //         'view-content': {
        //             templateUrl: 'drink.html',
        //             controller : 'DrinkController'
        //         }
        //     }
        // })
        // .state('menu.chat-single', {
        //     url: '/chat-single',
        //     views: {
        //         'view-content': {
        //             templateUrl: 'chat-single.html',
        //             controller : 'ChatSingleController'
        //       }
        //     }
        // })
        // .state('menu.tab-1', {
        //     url: '/tab-1',
        //     views: {
        //         'view-content': {
        //             templateUrl: 'tab-1.html',
        //             controller : 'TabOneController'
        //         }
        //     }
        // })
        // .state('menu.tab-2', {
        //     url: '/tab-2',
        //     views: {
        //         'view-content': {
        //             templateUrl: 'tab-2.html',
        //             controller : 'TabTwoController'
        //         }
        //     }
        // })
        // .state('menu.tab-3', {
        //     url: '/tab-3',
        //     views: {
        //         'view-content': {
        //             templateUrl: 'tab-3.html',
        //             controller : 'TabThreeController'
        //         }
        //     }
        // })

    $urlRouterProvider.otherwise('/menu/home');
}])


