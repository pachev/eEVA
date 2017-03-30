// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('App', ['ionic', 'App.controllers', 'ui.calendar'])

    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })
            .state('intro', {
                url: '/intro',
                templateUrl: 'templates/intro.html',
                controller: 'IntroCtrl'
            })


            .state('app.homepage', {
                url: '/homepage',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/homepage.html',
                        controller: 'HomeCtrl'
                    }
                }
            })

            .state('app.session', {
                url: '/session',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/session.html',
                        controller: 'HomeCtrl'

                    }
                }
            })
            .state('app.results', {
                url: '/session/results',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/results.html',
                        controller: 'HomeCtrl'

                    }
                }
            })
            .state('app.schedule', {
                url: '/schedule',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/schedule.html',
                        controller: 'ScheduleCtrl'
                    }
                }
            })

            .state('app.notes', {
                url: '/notes',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/notes.html',
                        controller: 'NotesCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/intro');
    });
