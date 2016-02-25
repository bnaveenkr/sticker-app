 /* Javascript */
"use strict;"

var stickerApp = angular.module('photoSticker', ["ui.router", "ui.bootstrap"]);

stickerApp.config(function($stateProvider, $urlRouterProvider) {
$urlRouterProvider.otherwise("/");
  $stateProvider
    .state('homepage', {
      name: "home",
      url: "/",
      templateUrl : 'stickerapp.html'
    })
});


stickerApp.controller('PhotoCtrl', ['$scope', function($scope){

    $scope.images = [];

    $scope.imageUpload = function(event){
         var files = event.target.files; //FileList object
         
         for (var i = 0; i < files.length; i++) {
                 var file = files[i];
                 var reader = new FileReader();
                 reader.onload = $scope.imageIsLoaded; 
                 reader.readAsDataURL(file);
         }
    }

    $scope.imageIsLoaded = function(e){
        $scope.$apply(function() {
            $scope.images.push(e.target.result);
        });
    }

    $scope.StartOver = function(){
        $scope.images = []
    }

    $scope.isPhotoLoaded = function(){
        return ($scope.images.length > 0) ? true : false;
    }

}])


stickerApp.controller('StickerCtrl', ['$scope', '$uibModal', function($scope, $uibModal){
    
    $scope.stickers = [];    

    $scope.open = function() {
    var modalInstance = $uibModal.open({
        templateUrl: 'stickerupload.html',
        controller : 'StickerUploadCtrl'
    })

    modalInstance.result.then(function (sticker) {
      $scope.stickers.push(sticker);
    }, function () {
        // do nothing for now.
    });
    };

}]);

stickerApp.controller("StickerUploadCtrl", ['$scope', '$uibModalInstance', function($scope, $uibModalInstance){
    
    $scope.sticker = {
        'image' : '',
        'title' : 'Some sticker'
    }


    $scope.imageUpload = function(event){
         var files = event.target.files; //FileList object
         
         for (var i = 0; i < files.length; i++) {
                 var file = files[i];
                 var reader = new FileReader();
                 reader.onload = $scope.imageIsLoaded; 
                 reader.readAsDataURL(file);
         }
    }

    $scope.imageIsLoaded = function(e){
        $scope.$apply(function() {
            $scope.sticker.image = e.target.result; 
            console.log(e.target.result)
        });
    }

$scope.ok = function () {
    $uibModalInstance.close($scope.sticker);
  };

$scope.cancel = function(){
    $uibModalInstance.dismiss('cancel');
}

}]);
