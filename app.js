var myApp = angular.module('myApp', ['spotify']);

var myCtrl = myApp.controller('myCtrl', function($scope, $http, Spotify) {
    $scope.artists={};
    
    $scope.name;
    $scope.popularity;
    $scope.genres;
    $scope.followers;

    $scope.searchArtist = function () {
        Spotify.search($scope.searchartist, 'artist').then(function (data) {
            $scope.artists = data.artists.items;
        });
    };
    
    $scope.artistSelected = function(artistId) {
            Spotify.getArtist(artistId).then(function (data) {
            $scope.name = data.name;
            $scope.popularity = data.popularity;
            if (typeof data.genres !== 'undefined' && data.genres.length > 0) {
                $scope.genres = data.genres;
            } else {
                $scope.genres = ["Unlisted"];
            }
            console.log($scope.genres);
            $scope.followers = data.followersTotal;
            
        });
    }
});

