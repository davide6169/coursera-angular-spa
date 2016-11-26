(function(){
  'use strict';

  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)
  .directive('foundItems',FoundItemsDirective);

  NarrowItDownController.$inject = ['$scope','MenuSearchService'];
  
  function NarrowItDownController($scope,MenuSearchService) {
    $scope.ctrl = this;
 
    $scope.ctrl.searchTerm = "";
    $scope.ctrl.found;

    $scope.ctrl.getMatchedMenuItems = function() {
      var promise = MenuSearchService.getMatchedMenuItems($scope.ctrl.searchTerm);

      promise.then(function(response) {
        $scope.ctrl.found = response;
      })
      .catch(function(error) {
        $scope.ctrl.found = [];
      });
    };

    $scope.ctrl.removeItem = function (index) {
      $scope.ctrl.found.splice(index,1);
    };
  };

  MenuSearchService.$inject = ['$http'];

  function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
      return $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json"
      }).then(function(response){
        var foundItems = [];

        if(searchTerm.length > 0) {
          for(var i=0;i<response.data.menu_items.length;i++) {
            if(response.data.menu_items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) {
              foundItems.push(response.data.menu_items[i]);
            }
          }
        }

        return foundItems;
      });
    };
  };

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html', 
      scope: {
        found: '<',
        onRemove: '&'
      }, 
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };

    return ddo;
  };
 
  function FoundItemsDirectiveController() {
    var list = this;

    list.nothingFound = function() {
      return (list.found.length === 0); 
    };
  };
})();
