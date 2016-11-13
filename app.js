(function(){
  'use strict';

  angular.module('LunchCheck',[])
  .controller('LunchCheckController',LunchCheckController);

  LunchCheckController.$inject = ['$scope','$filter'];
  
  function LunchCheckController($scope,$filter) {
    $scope.menu = "";
    $scope.message = "";

    $scope.checkIfTooMuch = function() {
      $scope.message = evalMessage($scope.menu); 
    };

    function evalMessage(string) {
      var messageString = "";

      var items = string.split(",");

      if (string.length == 0) {
        messageString = "Please enter data first";
      } else if (items.length <= 3) {
        messageString = "Enjoy!";
      } else if (items.length > 3) {
        messageString = "Too much!";
      } 

      return messageString;
    };
  }

})();
