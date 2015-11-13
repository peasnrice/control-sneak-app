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

        .state('menu.email-signup', {
            url: '/email-signup',
            views: {
                'view-content': {
                    templateUrl: 'templates/email-signup.html',
                    controller: 'EmailSignUpController'
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

        .state('menu.create-game', {
            url: '/create-game',
            views: {
                'view-content': {
                    templateUrl: 'templates/create-game.html',
                    controller: 'CreateGameController'
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

        .state('menu.profile', {
            url: '/profile',
            views: {
                'view-content': {
                    templateUrl: 'templates/profile.html',
                    controller: 'ProfileController'
                }
            }
        })

        .state('menu.settings', {
            url: '/settings',
            views: {
                'view-content': {
                    templateUrl: 'templates/settings.html',
                    controller: 'SettingsController'
                }
            }
        })

        .state('menu.global-stats', {
            url: '/global-stats',
            views: {
                'view-content': {
                    templateUrl: 'templates/global-stats.html',
                    controller: 'GlobalStatsController'
                }
            }
        })

    $urlRouterProvider.otherwise('/menu/home');
}])


