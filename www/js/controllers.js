angular.module('starter.controllers', ['firebase'])

.controller('ChatsCtrl', function($scope, $firebaseArray, $rootScope) {

  var ref = firebase.database().ref().child("messages");
  $scope.chats = $firebaseArray(ref);

  $scope.Sendmsg = function(chat){

      if($rootScope.facebook){
          $scope.chats.$add({
            user : $rootScope.facebook.displayName,
            message : chat.message,
            img : $rootScope.facebook.photoURL
          });
          chat.message = "";
      }
      else {
        alert("로그인 하세요");
      }


  }

})

.controller('AccountCtrl', function($scope, $firebaseAuth, $rootScope) {
  $scope.login = function(){
    var auth = $firebaseAuth();

    auth.$signInWithPopup("facebook").then(function(firebaseUser) {
      console.log("Signed in as:", firebaseUser.user);
      $rootScope.facebook = firebaseUser.user;
    }).catch(function(error) {
      console.log("Authentication failed:", error);
    });
  }

});
