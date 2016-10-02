'use strict';

angular.module('ngSocial.facebook', ['ngRoute','ngFacebook'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/facebook', {
    templateUrl: 'facebook/facebook.html',
    controller: 'FacebookCtrl'
  });
}])

.config( function( $facebookProvider ) {
  $facebookProvider.setAppId('1735687190024302');
  $facebookProvider.setPermissions('email,public_profile,user_posts,publish_actions,user_photos')
})

.run(function($rootScope) {
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
})

.controller('FacebookCtrl', ['$scope', '$facebook',function($scope, $facebook) {
  $scope.isLoggedIn = false;

  $scope.login = function() {
    $facebook.login().then(function() {
      console.log('Logged in.');
      $scope.isLoggedIn = true;
      refresh();
    });
  }

  $scope.logout = function() {
    $facebook.logout().then(function() {
      console.log('Logged out.');
      $scope.isLoggedIn = false;
      refresh();
    });
  }

  function refresh() {
    $facebook.api('/me', {
      fields: 'name, first_name, last_name, email, gender, locale, link, picture, permissions'
    }).then(function(response) {
      // console.log(response);
      $scope.welcomeMsg = 'Welcome ' + response.name;
      $scope.isLoggedIn = true;
      $scope.userInfo = response;
      $scope.picture = response.picture.data.url;
      $scope.permissions = response.permissions.data;
      $facebook.api('/me/posts?fields=attachments,message,created_time,story').then(function(response) {
        $scope.posts = response.data;
        console.log($scope.posts);
        var attachments = [];
        for(var i=0; i<$scope.posts.length; i++){
          // console.log($scope.posts[i].id);
          $facebook.api('/'+$scope.posts[i].id+'/attachments').then(function(response) {
            attachments.push(response.data[0]);
          });
        }
        console.log($scope.posts);
      });
    },
    function(err) {
      $scope.welcomeMsg = 'Please log in.';
    });
  }

  $scope.postStatus = function() {
      var body = this.body;
      console.log("We've tried to post...")
      $facebook.api('/me/feed', 'post', {message: body})
      .then(function() {
        $scope.msg = 'Thanks for posting.';
        refresh();
      });
  }
  refresh();
}]);
