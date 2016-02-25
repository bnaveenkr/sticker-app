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
        });
    }

$scope.ok = function () {
    $uibModalInstance.close($scope.sticker);
  };

$scope.cancel = function(){
    $uibModalInstance.dismiss('cancel');
}

}]);

stickerApp.directive("stickerDrag", function(){
    return function(scope, element, attrs){
        var elem = element[0];
        elem.draggable = true;
        elem.addEventListener('dragstart', function(event){
            event.dataTransfer.setData('text/plain', this.src);
            event.target.style.border = "1px solid #CCCCCC";
        }, false);
        elem.addEventListener('dragend', function(event){
            event.target.style.border = "none";
        }, false);
    }
});

stickerApp.directive("stickerDroparea", function(){
    return function(scope, element, attrs){
        var elem = element[0];
        elem.addEventListener('dragenter', function(event){
            event.target.style.border = "2px dashed #ff0000";
        }, false);

        elem.addEventListener('dragover', function(event){
            event.preventDefault();
            return false;
        }, false);

        elem.addEventListener('dragleave', function(event){
        event.target.style.border = "none";
        }, false);

        elem.addEventListener('drop', function(event){
            event.target.style.border = "none";
            var data = event.dataTransfer.getData("text/plain");
            var imgTag = document.createElement("img");
            imgTag.src = data;
            imgTag.width = "200px";
            this.appendChild(imgTag)
            event.preventDefault();
        }, false);
    }
})
