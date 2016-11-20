(function(){
  'use strict';

  angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyController',ToBuyController)
  .controller('AlreadyBoughtController',AlreadyBoughtController)
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

  ToBuyController.$inject = ['$scope','ShoppingListCheckOffService'];
  
  function ToBuyController($scope,ShoppingListCheckOffService) {
    $scope.toBuy = this;

    $scope.toBuy.items = ShoppingListCheckOffService.getItemsToBuy();

    $scope.toBuy.moveItem = function(itemIndex) {
      ShoppingListCheckOffService.moveItem(itemIndex);
    };
  };

  AlreadyBoughtController.$inject = ['$scope','ShoppingListCheckOffService'];

  function AlreadyBoughtController($scope,ShoppingListCheckOffService) {
    $scope.alreadyBought = this;

    $scope.alreadyBought.items = ShoppingListCheckOffService.getItemsAlreadyBought();
  };

  function ShoppingListCheckOffService() {
    var service = this;

    var itemsToBuy = [
      {
        name: "Cookies",
        quantity: 10
      },
      {
        name: "Ice Creams",
        quantity: 8
      },
      {
        name: "Chocolates",
        quantity: 15
      },
      {
        name: "Pies",
        quantity: 3
      },
      {
        name: "Pizza",
        quantity: 5 
      }
    ];

    var itemsAlreadyBought = [];

    service.getItemsToBuy = function() {
      return itemsToBuy;
    };

    service.getItemsAlreadyBought = function() {
      return itemsAlreadyBought;
    };

    service.moveItem = function (itemIndex) {
      if(itemsToBuy.length > 0) {
        itemsAlreadyBought.push(itemsToBuy[itemIndex]);
        itemsToBuy.splice(itemIndex,1);
      } 
    };
  };

})();
