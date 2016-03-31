//Create teh angular application
var app = angular.module('reddit', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider){
    $stateProvider.state(
        'home', {
          url: '/home',
          templateUrl: '/home.html',
          controller: 'MainController'
        }
      ).state(
        'posts', {
          url: '/posts/{id}',
          templateUrl: '/posts.html',
          controller: 'PostsController'
        }
      );

    $urlRouterProvider.otherwise('home');
  }
]);

app.factory('posts', [function(){
  var o = {
    posts:[]
  };

  return o;
}]);

app.controller('MainController', [
'$scope',
'posts',
function ($scope, posts){
  $scope.posts = posts.posts;

  $scope.addPost = function(){
    if(!$scope.title || $scope.title === ''){$scope.warning = "Please make sure to add a title before submitting!"; return;} 
    $scope.posts.push({
        title:$scope.title, 
        link:$scope.link,
        upvotes: 0,
        comments: [
          {author: 'Joe', body: 'Cool post!', upvotes: 0},
          {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
        ]
    });
    $scope.title = '';
    $scope.link='';
    $scope.warning = '';
  }

  $scope.upVote = function(post){
    post.upvotes += 1;
  }
}]);

app.controller('PostsController',[
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts){
  $scope.post = posts.posts[$stateParams.id];
  $scope.addComment = function(){
    if($scope.body === ''){$scope.warning = "Please input a comment!"; return;}

    $scope.post.comments.push({
      body: $scope.body,
      author: 'user',
      upvotes: 0
    });
    $scope.body = '';
    $scope.warning = '';
  };
}]);