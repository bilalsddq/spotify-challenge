var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.getData = function(url) {
    $http.get(url).success(function(response){
      $scope.data = response.data 
    })
  }
})

var ngApp = angular.module('spotifyApp', ['spotify']);

 //Creates Controller
ngApp.controller('primary', ['$scope', '$http', 'Spotify', function($scope, $http, Spotify) {
    //* Global controller variables
    //  Used for showing the selected artist
    $scope.returnArtistId = -1;
    //  Shows/Hides description box
    $scope.showDescription = false;

    //  Query by data entered into the inputArtist model
    $scope.searchArtist = function() {
        //  Checks if model is empty, if so, set variables to hide and to unselect row
        if ($scope.inputArtist) {
            $scope.returnArtistId = -1;
            $scope.showDescription = false;
        }
        //  Searches the spotify database for the artist
        Spotify.search($scope.inputArtist, 'artist', {limit: 10}).then( function(data) {
            //  Stores to a list to be repeated
            $scope.rawArtistList = data.artists.items;
        });
    };

    //  On selecting a table, this function executes taking in the artistId as a param
    $scope.artistSelected = function(artistId) {
        //  Used for showing the selected table row
        $scope.returnArtistId = artistId;
        //  Used for showing the description box
        $scope.showDescription = true;

        //  Queries the artist based (requires artistId)
        Spotify.getArtist(artistId).then(function (artist) {
            //  Stores artist name
            $scope.returnName = artist.name;
            //  Stores artist url
            $scope.returnUrl = artist.external_urls.spotify;
            //  Stores artist popularity
            $scope.returnPop = artist.popularity;
            //  Stores artist genres. If genre doesn't exist, display "Unknown/Not Listed"
            if (typeof artist.genres !== 'undefined' && artist.genres.length > 0) {
                $scope.returnGenres = artist.genres;
            } else {
                $scope.returnGenres = ["Unknown/Not Listed"];
            }
        });

        //  Gets the artist's top tracks in the US
        Spotify.getArtistTopTracks(artistId, 'US').then(function (data) {
            //  Stores artist's top tracks
            $scope.returnTopSongs = data.tracks;
        });
    }
}]);
