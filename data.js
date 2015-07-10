var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.getData = function(url) {
    $http.get(url).success(function(response){
      $scope.data = response.data 
    })
  }
})

