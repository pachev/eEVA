angular.module('App.controllers', [])

    .controller('AppCtrl', function($scope, $state, $ionicModal, $timeout) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        $scope.homepage = function() {

            $state.go('app.homepage');
        }

        // Open the login modal
        $scope.login = function() {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $scope.closeLogin();
            }, 1000);
        };
    })
    .controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate ) {

        $scope.logo = "<img class='logo-header' src='img/Logo.png'>";
        // User attemped login

        // Called to navigate to the main app
        var startApp = function() {
            $state.go('app.homepage');
        };

        // Check if the user already did the tutorial and skip it if so
        if(window.localStorage['didTutorial'] === "true") {
            console.log('Skip intro');
            startApp();
        }
        $scope.getIndex = function() {

            return $ionicSlideBoxDelegate.currentIndex();

        };


        // Move to the next slide
        $scope.next = function() {
            $ionicSlideBoxDelegate.next()
        };

        // Move to the next slide
        $scope.start = function() {
            startApp();
        };

        // Our initial right buttons
        var rightButtons = [
            {
                content: 'Next',
                type: 'button-positive button-clear',
                tap: function(e) {
                    // Go to the next slide on tap
                    $scope.next();
                }
            }
        ];

        // Our initial left buttons
        var leftButtons = [
            {
                content: 'Skip',
                type: 'button-positive button-clear',
                tap: function(e) {
                    // Start the app on tap
                    startApp();
                }
            }
        ];

        // Bind the left and right buttons to the scope
        $scope.leftButtons = leftButtons;
        $scope.rightButtons = rightButtons;


        // Called each time the slide changes
        $scope.slideChanged = function(index) {

            // Check if we should update the left buttons
            if(index > 0) {
                // If this is not the first slide, give it a back button
                $scope.leftButtons = [
                    {
                        content: 'Back',
                        type: 'button-positive button-clear',
                        tap: function(e) {
                            // Move to the previous slide
                            $scope.$broadcast('slideBox.prevSlide');
                        }
                    }
                ];
            } else {
                // This is the first slide, use the default left buttons
                $scope.leftButtons = leftButtons;
            }

            // If this is the last slide, set the right button to
            // move to the app
            if(index == 2) {
                $scope.rightButtons = [
                    {
                        content: 'Start using MyApp',
                        type: 'button-positive button-clear',
                        tap: function(e) {
                            startApp();
                        }
                    }
                ];
            } else {
                // Otherwise, use the default buttons
                $scope.rightButtons = rightButtons;
            }
        };
    })
    .controller('HomeCtrl', function($scope, $state, $timeout, $ionicModal) {
        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        if(window.localStorage['didTutorial'] === "false"){

            $scope.login();
            // Set a flag that we finished the tutorial
            window.localStorage['didTutorial'] = true;
        }
        });



        // Using this section to navigate to the different pages from home buttons
        $scope.session = function() {
            $state.go('app.session');
        };
        $scope.schedule = function() {
            $state.go('app.schedule');
        };
        $scope.notes = function() {
            $state.go('app.notes');
        };
        $scope.results = function() {
            $state.go('app.results');
        };
        $scope.logo = "<img class='logo-header' src='img/Logo.png'>";


        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function() {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $scope.closeLogin();
            }, 1000);
        };

    })
    .controller('NotesCtrl', function($scope, $state, $timeout, $ionicModal) {
        // Using this section to navigate to the different pages from home buttons
        $scope.notes = [
            {
                time: 1490853924,
                note: "Today was a good day",
                title: "How I feel 3/22/2017"
            },

            {
                time: 1490853924,
                note: "Today was not  a good day",
                title: "What I thought 3/1/2017"
            },
        ]
        // Create and load the Modal
        $ionicModal.fromTemplateUrl('templates/newNote.html', function(modal) {
            $scope.taskModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });

        // Create and load the edit Modal
        $ionicModal.fromTemplateUrl('templates/editNote.html', function(modal) {
            $scope.editModal = modal;
        }, {
            scope: $scope,
            animation: 'slide-in-up'
        });

        // Called when the form is submitted
        $scope.createNote = function(note) {

            d = Math.floor(Date.now() /1000);

            $scope.notes.push({
                title: note.title,
                note: note.note,
                time: d
            });
            note.title = "";
            note.note = "";
            console.log(note);
            $scope.taskModal.hide();
        };

        $scope.saveNote = function(i,note) {

            console.log("nothing being saved");
            $scope.note[i] = note;
            $scope.editModal.hide();
            note.title = "";
            note.note = "";
        };

        $scope.editNote = function(i,note) {
            $scope.note = {title: note.title, note: note.note, time: note.time};
            $scope.noteIndex = i;
            $scope.editModal.show();

        };

        // Open our new task modal
        $scope.newNote = function() {
            $scope.taskModal.show();
        };

        // Close the new modal
        $scope.closeNewNote = function() {
            $scope.taskModal.hide();
        };

        // Close the new edit modal
        $scope.closeEditNote = function() {
            $scope.editModal.hide();
        };
    })
    .controller('ScheduleCtrl', function($scope, $state, $compile,uiCalendarConfig) {
        //Some default events for the calendar
        $scope.eventSources = [
            {
                'title'  : 'Pysical Appointment',
                'start'  : '2017-03-31T12:00:00',
                'end'  : '2017-03-31T12:30:00',
                'allDay' : false // will make the time show
            },
            {
                'title'  : 'Virtual Appointment',
                'start'  : '2017-04-05',
                'end'  : '2017-04-05',
            },
            {
                'title'  : 'Physical Appointment',
                'start'  : '2017-04-14T12:00:00',
                'allDay' : false // will make the time show
            }

        ];
        $scope.phys_selected = true;
        $scope.virt_selected = false;

        $scope.toggleSelected = function() { 

            if($scope.phys_selected){
                $scope.phys_selected =false;
                $scope.virt_selected =true;
            }else{
                $scope.phys_selected = true;
                $scope.virt_selected = false;

            }
        };


        /* config object */
        $scope.uiConfig = {
            calendar:{
                height: 450,
                editable: true,
                header:{
                    left: 'month agendaWeek agendaDay',
                    center: 'title',
                    right: 'today prev,next'
                },
                eventClick: $scope.alertEventOnClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize
            }
        };

    });



