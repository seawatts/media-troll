'use strict';

angular.module('mediaTrollApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.torrents = [];

    $http.get('/api/torrents').success(function(torrents) {
      $scope.torrents = torrents;
      socket.syncUpdates('torrent', $scope.torrents);
    });

    $scope.addTorrent = function() {
      if($scope.newTorrent === '') {
        return;
      }
      $http.post('/api/torrents', { name: $scope.newTorrent });
      $scope.newTorrent = '';
    };

    $scope.deleteTorrent = function(torrent) {
      $http.delete('/api/torrents/' + torrent._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('torrent');
    });
  });
